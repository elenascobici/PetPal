from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

app_name = 'accounts'
urlpatterns = [
    # to redirect/reverse, format is 'namespace:name'
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/seeker/', views.RegisterSeekerView.as_view(), name='register_seeker'),
    path('register/shelter/', views.RegisterShelterView.as_view(), name='register_shelter'),
    path('update/seeker/', views.UpdateSeekerView.as_view(), name='update_seeker'),
]