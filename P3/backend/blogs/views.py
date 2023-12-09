from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveAPIView, ListAPIView, RetrieveDestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import BlogSerializer, LikeSerializer
from .permissions import BlogCreatePermission, LikePermission
from .models import Blog, Like
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
        user = self.request.user
        like_instance = get_object_or_404(Like, blog__id=blog_id, user=user)
        serializer = LikeSerializer(like_instance)
        return Response({'exists': True})

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