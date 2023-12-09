from django.urls import path
from .views import PetViewSet, ServePetPicture
from django.conf import settings
from django.conf.urls.static import static

app_name = 'pet'

urlpatterns = [
    path('shelter/<int:shelter_id>/pet/', PetViewSet.as_view({
        'post': 'create'
    }), name='shelter-pet-create'),

    path('shelter/<int:shelter_id>/pet/<int:pet_id>/', PetViewSet.as_view({ 
        'put': 'update',
        'delete': 'destroy'
    }), name='shelter-pet-update-delete'),

    path('shelter/<int:shelter_id>/pets/', PetViewSet.as_view({ # shelter can see all pets they own
        'get': 'list'
    }), name='shelter-pet-list'),

    path('pets/', PetViewSet.as_view({ # seeker can see all pets
        'get': 'list'
    }), name='pet-list'),

    path('<int:pet_id>/', PetViewSet.as_view({  # seeker can see any pet individually
        'get': 'list'
    }), name='pet-detail'),

    path('search/', PetViewSet.as_view({
        'get': 'filter_pet'
    }), name='pet-search'),

    path('pet-image/<str:filename>', ServePetPicture.as_view(), name='pet-picture'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
