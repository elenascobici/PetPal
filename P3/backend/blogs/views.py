from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView, RetrieveDestroyAPIView, ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny

from notifications.models import Notification
from .serializers import BlogReplySerializer, BlogResponseSerializer, BlogSerializer, LikeSerializer
from .permissions import BlogCreatePermission, LikePermission
from .models import Blog, BlogComment, BlogResponse, Like
from rest_framework.response import Response
from django.http import FileResponse, HttpResponse
from django.conf import settings
from rest_framework.pagination import PageNumberPagination

class BlogPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'

class BlogCreate(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, BlogCreatePermission]

class BlogList(ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()
    pagination_class = BlogPagination

    def get_queryset(self):
        shelter_id = self.request.query_params.get('shelter')
        if shelter_id:
            queryset = Blog.objects.filter(author__id=shelter_id)
        else:
            queryset = Blog.objects.all()
        return queryset


class BlogDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    
    def perform_update(self, serializer):
        instance = serializer.instance
        print(instance.author.id == self.request.user.id)
        if instance.author.id != self.request.user.id:
            raise PermissionDenied("You are not permitted to update this blog")
        serializer.save()

    
    def perform_destroy(self, instance):
        if instance.author.id != self.request.user.id:
            raise PermissionDenied("You are not permitted to delete this blog")
        instance.delete()

class LikeCreate(CreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated, LikePermission]

    def perform_create(self, serializer):
        # Get the blog_id from the query parameters
        blog_id = self.kwargs.get('blog_id')

        # Get the corresponding blog instance
        existing_like = Like.objects.filter(user=self.request.user, blog_id=blog_id).first()
        if existing_like:
            raise PermissionDenied("You have already liked this blog")

        # Increase the likes count of the blog by 1
        blog = Blog.objects.get(pk=blog_id)
        blog.likes += 1
        blog.save()

        # Set the serializer's validated data with the blog instance for Like creation
        serializer.validated_data['blog'] = blog
        serializer.save()


class LikeUpdate(RetrieveDestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated, LikePermission]

    def get(self, request, blog_id):
        like_instance = Like.objects.filter(user=self.request.user, blog__id=blog_id).first()
        if not like_instance:
            return Response({'liked': False})
        serializer = LikeSerializer(like_instance)
        return Response({'liked': True})

    def get_object(self):
        blog_id = self.kwargs.get('blog_id')
        user = self.request.user
        return get_object_or_404(Like, blog__id=blog_id, user=user)

    def perform_destroy(self, instance):
        blog = instance.blog
        blog.likes -= 1
        blog.save()
        instance.delete()


class ServeBlogPicture(RetrieveAPIView):
    permission_classes = [AllowAny]
    def get(self, request, filename):
        imagePath = settings.MEDIA_ROOT / 'blogs' / filename
        try:
            return FileResponse(open(imagePath, 'rb'), content_type="image/jpeg")
        except FileNotFoundError:
            return HttpResponse("Image not found", status=404)
        

class BlogCommentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class BlogCommentListCreate(ListCreateAPIView):
    pagination_class = BlogCommentPagination
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BlogReplySerializer
        return BlogResponseSerializer


    def get_queryset(self):
        blog_id = self.kwargs.get('blog_id')
        blog = get_object_or_404(Blog, pk=blog_id)
        queryset = BlogResponse.objects.filter(commented_blog_id=blog)
        queryset = queryset.order_by('-time')
        queryset = queryset.select_related('commenter')
        
        return queryset
    
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication failed"}, status=401)
        return super().get(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication failed"}, status=401)
        
        blog_id = kwargs.get('blog_id')
        blog = get_object_or_404(Blog, pk=blog_id)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if isinstance(serializer, BlogReplySerializer):
            if request.user.get_user_type() == "Shelter" and request.user.id != blog.author.id:
                return Response({"detail": "Shelters cannot reply on another shelter's blogs"}, status=403)
            comment_id = self.request.query_params.get('comment_id')
            comment = get_object_or_404(BlogComment, pk=comment_id)

            # Check that this comment being replied to belongs to the shelter
            commented_blog = comment.get_commented_blog()
            if commented_blog == None or commented_blog.id != blog_id:
                return Response({"detail": "This comment is not for the specified blog"}, status=403)
            event = serializer.save(commenter=request.user, comment=comment)

        headers = self.get_success_headers(serializer.data)
        if comment.get_commenter().id != request.user.id:
            if request.user.get_user_type() == "Shelter":
                name = blog.author.name
            else:
                name = request.user.username
            Notification.objects.create(user=comment.get_commenter(), sender=request.user, event=event, 
                                        text=f"{name} replied to your comment")
        return Response(serializer.data, status=201, headers=headers)


class BlogResponseCreate(CreateAPIView):
    serializer_class = BlogResponseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        print("CREATE")
        blog_id = self.kwargs.get('blog_id')
        blog = get_object_or_404(Blog, pk=blog_id)
        serializer.is_valid()

        event = serializer.save(commenter=self.request.user, commented_blog=blog)
        Notification.objects.create(user=blog.author, sender=self.request.user, event=event, 
                                    text=f"{self.request.user.username} left a review")
    
    def create(self, request, *args, **kwargs):
        if self.request.user.get_user_type() == "Shelter":
            return Response({"detail": "Shelters cannot leave comments on other shelters' blogs"}, status=403)
        return super().create(request, *args, **kwargs)