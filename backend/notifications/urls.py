from django.urls import path
from . import views

app_name="notifications"
urlpatterns = [
    path('list/', views.NotificationListView.as_view(), name='notification_list'),
    path('<int:pk>/', views.NotificationGetUpdateDeleteView.as_view(), name='notifications'),
]