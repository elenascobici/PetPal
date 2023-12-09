from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import BlogSerializer, LikeSerializer
from .permissions import BlogCreatePermission, LikePermission
from .models import Blog
from rest_framework.response import Response

class BlogCreate(CreateAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated, BlogCreatePermission]

class BlogList(ListAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    queryset = Blog.objects.all()

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
        blog = Blog.objects.get(pk=blog_id)

        # Increase the likes count of the blog by 1
        blog.likes += 1
        blog.save()

        # Set the serializer's validated data with the blog instance for Like creation
        serializer.validated_data['blog'] = blog
        serializer.save()
