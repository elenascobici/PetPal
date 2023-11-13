from rest_framework import viewsets
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
      return Response({"detail": "Seekers cannot submit applications"}, status=403)

    # A shelter must be signed in to create a pet-listing
    if not self.request.user.is_autheticated:
      return Response({"detail": "Authetication failed"}, status=403)

    # A shelter cannot create/list the same pet
    name = serializer.validated_data['name']
    breed = serializer.validated_data['breed']
    shelter = serializer.validated_data['shelter']

    if PetDetail.objects.filter(name=name, breed=breed, shelter=shelter).exists():
      return Response({"detail": "This shelter already has a pet with this name and breed. Duplicate pet postings not allowed."}, status=403)
    
    # if all conditions are met, save 
    serializer.save()
    