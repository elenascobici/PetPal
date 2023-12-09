from django.urls import path
from . import views

app_name="blogs"
urlpatterns = [
    path('new-blog/', views.BlogCreate.as_view(), name='create-blog'),
    path('<int:pk>/', views.BlogDetail.as_view(), name='detail-blog'),
    path('like/<int:blog_id>/', views.LikeCreate.as_view(), name='create-like'),
]