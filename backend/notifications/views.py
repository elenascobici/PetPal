from django.shortcuts import get_object_or_404, render
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, RetrieveUpdateDestroyAPIView
from notifications.models import Notification
from notifications.serializers import NotificationSerializer, NotificationGetSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from notifications.permissions import NotificationPermission

# Create your views here.
class NotificationPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'

class NotificationListView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = NotificationPagination

    def get_queryset(self):
        sort = self.request.query_params.get('sort')
        filter = self.request.query_params.get('filter')
        if filter == 'read':
            queryset = Notification.objects.filter(user=self.request.user.id, read = True)
        elif filter == 'unread':
            queryset = Notification.objects.filter(user=self.request.user.id, read = False)
        elif filter == None:
            queryset = Notification.objects.filter(user=self.request.user.id)
        else:
            raise PermissionDenied(detail="No such filter exists.")
        
        if sort == "creation-time":
            queryset = queryset.order_by('time')
        elif sort != None:
            raise PermissionDenied(detail="Invalid field to sort by.")
        
        return queryset
    
class NotificationGetUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, NotificationPermission]
    queryset = Notification.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return NotificationGetSerializer
        return NotificationSerializer

    def get(self, request, *args, **kwargs):
        notification_id = kwargs['pk']
        notification = get_object_or_404(Notification, pk=notification_id)
        if not notification:
            raise FileNotFoundError
        notification.read = True
        notification.save()
        return super().get(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return super().delete(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
