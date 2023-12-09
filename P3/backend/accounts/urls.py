from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'accounts'
urlpatterns = [
    path('api/token/', views.LoginView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('seeker/', views.RegisterSeekerView.as_view(), name='register_seeker'),
    path('shelter/', views.RegisterShelterView.as_view(), name='register_shelter'),
    path('profile/', views.RetrieveUpdateDestroyAccountView.as_view(), name='profile_edit_delete'),
    path('profile/<int:pk>/', views.RetrieveUpdateDestroyAccountView.as_view(), name='profile_get'),
    path('shelter-list/', views.ListSheltersView.as_view(), name='list_shelters'),
    path('profile-picture/<str:filename>/', views.ServeProfilePictureView.as_view(), name="serve-profile-picture")
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)