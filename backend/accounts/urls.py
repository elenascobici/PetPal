from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'accounts'
urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/seeker/', views.RegisterSeekerView.as_view(), name='register_seeker'),
    path('register/shelter/', views.RegisterShelterView.as_view(), name='register_shelter'),
    path('update/', views.UpdateAccountView.as_view(), name='update_account'),
    path('profile/<int:pk>/', views.ViewProfileView.as_view(), name='view_profile'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)