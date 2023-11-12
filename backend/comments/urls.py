from django.urls import path
from . import views

app_name="comments"
urlpatterns = [
    path('shelter/<int:shelter_id>/details/<int:user_id>/comments/', views.CommentListCreate.as_view(), name='comment'),
    path('shelter/<int:shelter_id>/details/<int:user_id>/review/', views.ReviewCreate.as_view(), name='review'),
    path('application/<int:pk>/<int:user_id>/messages', views.MessageListCreate.as_view(), name='messages')
]