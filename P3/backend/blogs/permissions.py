from rest_framework import permissions

class BlogCreatePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == "Shelter"

class LikePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.user_type == "Seeker"
    