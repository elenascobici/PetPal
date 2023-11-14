from rest_framework import viewsets, exceptions
from .models.PetDetailModel import PetDetail
from .serializers import PetSerializer
from rest_framework.response import Response
from accounts.models.ShelterModel import Shelter
from django.shortcuts import get_object_or_404


class PetViewSet(viewsets.ModelViewSet):
  queryset = PetDetail.objects.all()
  serializer_class = PetSerializer

  def create(self, request, *args, **kwargs):
    # Note: 4 images of the animal are required and all fields (except medical history and description) are required

    # A shelter must be signed in to create a pet-listing
    if not request.user.is_authenticated:
      return Response({"detail": "Authentication failed"}, status=401)
    
    shelter_id = kwargs.get('shelter_id')
    shelter = get_object_or_404(Shelter, pk=shelter_id)

    # Only shelters can submit applications
    if not request.user.shelter_set.filter(id=shelter.id).exists():
      return Response({"detail": "You do not have permission to add pets for this shelter."}, status=403)
    
    # A shelter cannot create/list the same pet
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    name = serializer.validated_data['name']
    breed = serializer.validated_data['breed']
    gender = serializer.validated_data['gender']

    # get the primary key from Shelter 
    if PetDetail.objects.filter(name=name, breed=breed, gender=gender, shelter=shelter).exists():
      return Response({"detail": "This shelter already has a pet with this name, gender and breed. Duplicate pet postings not allowed."}, status=403)
    
    # if all conditions are met, save 
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=201, headers=headers)
  
  # def perform_update(self, serializer):
  #   pet_instance = self.get_object()

  #   # Only shelters can update applications
  #   if not isinstance(self.request.user, Shelter):
  #     raise exceptions.PermissionDenied({"detail": "Seekers cannot update applications"})

  #   # A shelter must be signed in to update a pet-listing 
  #   if not self.request.user.is_authenticated:
  #     raise exceptions.PermissionDenied({"detail": "Authetication failed"})
    
  #   # A shelter must only update their own listing
  #   if pet_instance.shelter.user != self.request.user:
  #     raise exceptions.PermissionDenied({"detail": "You can only update your own pet listing"})
    
  #   # Once changes are made, they should not match an already existing pet this shelter owns
  #   name = serializer.validated_data.get('name', pet_instance.name)
  #   breed = serializer.validated_data.get('breed', pet_instance.breed)
  #   gender = serializer.validated_data.get('gender', pet_instance.gender)
    
  #   duplicate_pets = PetDetail.objects.filter(name=name, breed=breed, gender=gender)
  #   duplicate_pets_exclude = duplicate_pets.exclude(id=pet_instance.id)

  #   if duplicate_pets_exclude.exists():
  #     raise exceptions.ValidationError({"detail": "This is a duplicate pet. You already have a pet with the same name, breed and gender."})

  # def get_queryset(self):

  #   # if shelter, must be logged in and can only see their own listings
  #   user = self.request.user

  #   if user.is_autheticated and isinstance(self.request.user, Shelter):
  #     return PetDetail.objects.filter(shelter=user)
  #   else: # a non-logged in user can see all the listings 
  #     PetDetail.objects.all()



  
    