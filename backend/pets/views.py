from rest_framework import viewsets
from .models import PetDetail
from .serializers import PetSerializer
from rest_framework.response import Response
from accounts.models.ShelterModel import Shelter
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView

class PetViewSet(viewsets.ModelViewSet):
  queryset = PetDetail.objects.all()
  serializer_class = PetSerializer

  def get_permissions(self):
    if self.action == 'list':
        return [AllowAny()]
    else:
        return super().get_permissions()

  def create(self, request, *args, **kwargs):

    # shelter must be signed-in to create a pet-listing
    if not request.user.is_authenticated:
      return Response({"detail": "Authentication failed"}, status=401)
    
    # only shelters can create a pet
    shelter_id = self.kwargs.get('shelter_id')
    try:
        shelter = Shelter.objects.get(pk=shelter_id)
    except Shelter.DoesNotExist:
        return Response({"detail": "Only shelters create pet listings."}, status=404)
    
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    # shelter cannot create the same pet
    name = serializer.validated_data.get('name')
    type = serializer.validated_data.get('type')
    gender = serializer.validated_data.get('gender')

    if PetDetail.objects.filter(name=name, type=type, gender=gender, shelter=shelter).exists():
      return Response({"detail": "This shelter already has a pet with this name, gender and type. Duplicate pet postings not allowed."}, status=400)
    
    serializer.save(shelter=shelter)
    
    # if all conditions are met, save 
    headers = self.get_success_headers(serializer.data)
    return Response(serializer.data, status=201, headers=headers)

  def update(self, request, *args, **kwargs):

    # shelter must be signed-in to create a pet-listing
    if not request.user.is_authenticated:
      return Response({"detail": "Authentication failed"}, status=401)

    # retrieve the shelter_id and pet id
    shelter_id = self.kwargs.get('shelter_id')
    pet_id = self.kwargs.get('pet_id')

    # only shelters can update listings
    try:
        shelter = Shelter.objects.get(pk=shelter_id)
    except Shelter.DoesNotExist:
        return Response({"detail": "Only shelters can update pet-listings"}, status=404)
    
    # the pet in this shelter does not exist
    try:
        pet = PetDetail.objects.get(pk=pet_id, shelter=shelter)
    except PetDetail.DoesNotExist:
        return Response({"detail": "The pet you are trying you update doesn't exist"}, status=404)
    
    # the name, type and gender can't be updated
    for field in ['name', 'type', 'gender']:
      if field in request.data:
          return Response({"detail": f"{field} of a pet cannot be updated."}, status=401)

    serializer = self.get_serializer(pet, data=request.data)
    serializer.is_valid(raise_exception=True)

    serializer.save()

    # return a response with the updated pet details
    return Response(serializer.data, status=200)

  def get_queryset(self):

    user = self.request.user

    shelter_id = self.kwargs.get('shelter_id')

    # if the shelter is authenticated, show only *their* pet listings
    if shelter_id is not None:
      if user.is_authenticated:
        # shelters cannot view other shelter's pets after authentication
        if shelter_id != int(user.id):
          raise PermissionDenied({"detail": "You can only access your own pets."})
        
        shelter = Shelter.objects.get(pk=shelter_id)
        return PetDetail.objects.filter(shelter=shelter)
      else: # shelter must be authenticated
        raise PermissionDenied({"detail": "Authentication credentials were not provided."})

    # if the shelter is None, show all pets
    return PetDetail.objects.filter()
  
  def destroy(self, request, *args, **kwargs):

    # shelter must be signed-in to delete a pet-listing
    if not request.user.is_authenticated:
      return Response({"detail": "Authentication failed"}, status=401)

    # retrieve the shelter_id and pet_id
    shelter_id = self.kwargs.get('shelter_id')
    pet_id = self.kwargs.get('pet_id')

    # only shelters can delete listings
    try:
        shelter = Shelter.objects.get(pk=shelter_id)
    except Shelter.DoesNotExist:
        return Response({"detail": "Only shelters can delete pet listings"}, status=404)
    
    # the pet in this shelter does not exist
    try:
        pet = PetDetail.objects.get(pk=pet_id, shelter=shelter)
    except PetDetail.DoesNotExist:
        return Response({"detail": "The pet you are trying you delete doesn't exist"}, status=404)
    
    # shelters can only delete their own listings
    if pet.shelter != request.user.shelter:
      return Response({"detail": "You can only delete your own pet listings."}, status=403)

    # destroy
    self.perform_destroy(pet)
    return Response(status=204)