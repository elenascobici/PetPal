from rest_framework.permissions import BasePermission
from notifications.models import Notification

class NotificationPermission(BasePermission):
    def has_permission(self, request, view):
        # If the notification belongs to this user
        if request.user.id == Notification.objects.get(id=view.kwargs['pk']).user.id:
            return True
        return False
