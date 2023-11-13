from django.urls import path
from .views import PetViewSet

app_name='pet'
urlpatterns = [
  path('create/', PetViewSet.as_view({
    'post':'create'
  }), name='pet-create'),

  path('<int:pk>/', PetViewSet.as_view({
    'get':'retrieve',
    'put': 'update',
    'delete': 'destroy',
  }), name='pet-detail')
]