from rest_framework import viewsets, exceptions
from .models.PetDetailModel import PetDetail
from .serializers import PetSerializer
from rest_framework.response import Response
from accounts.models.ShelterModel import Shelter


class PetViewSet(viewsets.ModelViewSet):
  queryset = PetDetail.objects.all()
  serializer_class = PetSerializer

  def perform_create(self, serializer):

    # Note: 4 images of the animal are required and all fields (except medical history and description) are required

    # Only shelters can submit applications
    if not isinstance(self.request.user, Shelter):
      raise exceptions.PermissionDenied({"detail": "Seekers cannot submit applications"})

    # A shelter must be signed in to create a pet-listing
    if not self.request.user.is_authenticated:
      raise exceptions.PermissionDenied({"detail": "Authetication failed"})

    # A shelter cannot create/list the same pet
    name = serializer.validated_data['name']
    breed = serializer.validated_data['breed']
    shelter = serializer.validated_data['shelter']

    if PetDetail.objects.filter(name=name, breed=breed, shelter=shelter).exists():
      raise exceptions.PermissionDenied({"detail": "This shelter already has a pet with this name and breed. Duplicate pet postings not allowed."})
    
    # if all conditions are met, save 
    serializer.save()
    