from django.urls import path
from . import views

app_name="comments"
urlpatterns = [
    path('<int:shelter_id>/details/<int:user_id>/', views.CommentListCreate.as_view(), name='comment'),
    path('<int:shelter_id>/details/<int:user_id>/review/', views.ReviewCreate.as_view(), name='review'),
]