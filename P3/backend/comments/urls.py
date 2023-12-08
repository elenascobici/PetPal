from django.urls import path
from . import views

app_name="comments"
urlpatterns = [
    path('shelter/<int:shelter_id>/details/comments/', views.CommentListCreate.as_view(), name='comment'),
    path('shelter/<int:shelter_id>/details/review/', views.ReviewCreate.as_view(), name='review'),
    path('shelter/<int:shelter_id>/details/rating/', views.RatingCreate.as_view(), name='rating'),
    path('application/<int:pk>/messages', views.MessageListCreate.as_view(), name='messages')
]