from django.urls import path
from .views import PetViewSet
from django.conf import settings
from django.conf.urls.static import static

app_name = 'pet'

urlpatterns = [
    path('shelter/<int:shelter_id>/create/', PetViewSet.as_view({
        'post': 'create'
    }), name='pet-create'),

    path('<int:pk>/', PetViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'destroy',
    }), name='pet-detail')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
