from django.urls import path
from .views import PetViewSet
from django.conf import settings
from django.conf.urls.static import static

app_name = 'pet'

urlpatterns = [
    path('shelter/<int:shelter_id>/pet/', PetViewSet.as_view({
        'post': 'create'
    })),

    path('shelter/<int:shelter_id>/pet/<int:pet_id>/', PetViewSet.as_view({ 
        'put': 'update',
        'delete': 'destroy'
    })),

    path('shelter/<int:shelter_id>/pets/', PetViewSet.as_view({
        'get': 'list'
    })),

    path('shelter/pets/', PetViewSet.as_view({
        'get': 'list'
    })),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
