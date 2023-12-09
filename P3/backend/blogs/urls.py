from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name="blogs"
urlpatterns = [
    path('new-blog/', views.BlogCreate.as_view(), name='create-blog'),
    path('<int:pk>/', views.BlogDetail.as_view(), name='detail-blog'),
    path('list/', views.BlogList.as_view(), name='blog-list'),
    path('like/<int:blog_id>/', views.LikeCreate.as_view(), name='create-like'),
    path('likes/<int:blog_id>/', views.LikeUpdate.as_view(), name='likes'),
    path('blog-picture/<str:filename>/', views.ServeBlogPicture.as_view(), name='get-blog-picture')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)