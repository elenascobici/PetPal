from django.urls import path
from . import views

app_name="blogs"
urlpatterns = [
    path('new-blog/', views.BlogCreate.as_view(), name='create-blog'),
    path('like/<int:blog_id>/', views.LikeCreate.as_view(), name='create-like'),
]