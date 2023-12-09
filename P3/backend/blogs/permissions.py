from rest_framework import permissions

class BlogCreatePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == "Shelter"

class LikePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == "Seeker"
    
class IsAuthorOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user
