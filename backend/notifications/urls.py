from django.urls import path
from . import views

app_name="notifications"
urlpatterns = [
    path('list/', views.NotificationListView.as_view(), name='notification_list'),
    path('<int:pk>/', views.NotificationGetView.as_view(), name='notification_get'), 
    path('<int:pk>/', views.NotificationUpdateDelete.as_view(), name='notification_update_delete')
]