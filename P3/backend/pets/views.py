from rest_framework import viewsets
from .models import PetDetail
from .serializers import PetSerializer
from rest_framework.response import Response
from accounts.models.ShelterModel import Shelter
from accounts.models.SeekerModel import Seeker
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from notifications.models import Notification
from rest_framework.generics import RetrieveAPIView
from django.http import FileResponse, HttpResponse
from django.conf import settings

class SearchPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class PetViewSet(viewsets.ModelViewSet):
  queryset = PetDetail.objects.all()
  serializer_class = PetSerializer

  def get_permissions(self):
    if self.action == 'list' or self.action == 'filter_pet' :
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

    # Notifications
    # find all seekers that have preference as true and create notifications for each of them
    seekers_queryset = Seeker.objects.filter(preferences=True)
    event=serializer.save()
    for seeker in seekers_queryset:
      Notification.objects.create(user=seeker, sender=shelter, event=event, text=f"A new pet, {name}, has been created!")
    
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
        return Response({"detail": "The pet you are trying to update doesn't exist"}, status=404)
    
    # the name, type and gender can't be updated
    for field in ['name', 'type', 'gender']:
      if field in request.data:
          return Response({"detail": f"{field} of a pet cannot be updated."}, status=401)

    serializer = self.get_serializer(pet, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)

    serializer.save()

    # return a response with the updated pet details
    return Response(serializer.data, status=200)

  def get_queryset(self):

    user = self.request.user

    shelter_id = self.kwargs.get('shelter_id')
    pet_id = self.kwargs.get('pet_id')

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

    # if the shelter is None, Seeker is trying to see all pets OR 1 pet
    if user.is_authenticated:
      if pet_id is not None: 
        return PetDetail.objects.filter(id=pet_id) # endpoint -> pets/
      return PetDetail.objects.filter() # endpoint -> <int:pet_id>/
    else: # seekr must be authenticated
        raise PermissionDenied({"detail": "Authentication credentials were not provided."})
  
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
    
  def filter_pet(self, request):
    queryset = self.get_queryset()  # start with the base queryset

    # if a shelter is using the filter, they cannot filter by shelter
    if request.user.is_authenticated and self.request.user.user_type == 'Shelter':
      queryset = self.get_queryset().filter(shelter=request.user.shelter)
      shelter_name = request.query_params.get('shelter_name')
      if shelter_name:
        return Response({"detail": "You cannot filter by shelter. Please sign-out or sign-in as a Seeker to filter by shelter."}, status=403)
    elif request.user.is_authenticated:  
      # for Seekers filter by *shelter*, status, age, type
      shelter_name = request.query_params.get('shelter_name')
      
      if shelter_name:
        try: 
          shelter = Shelter.objects.get(name=shelter_name)
          queryset = queryset.filter(shelter=shelter)
        except Shelter.DoesNotExist:     # the shelter doesn't exist
          queryset = PetDetail.objects.none()
    else:
      return Response({"detail": "Authentication failed"}, status=401)
       
    # regardless of who the user is, filter by status, age, type 
    pet_type = request.query_params.get('type')
    status = request.query_params.get('status')
    age = request.query_params.get('age')
    
    if pet_type:
      queryset = queryset.filter(type__iexact=pet_type)
    
    if status:
      if status.lower() == 'all':
        pass
      else: 
         queryset = queryset.filter(status__iexact=status)
    else:
      # if status not given, default to 'Available'
      queryset = queryset.filter(status__iexact='Available')
         
    if age:
      queryset = queryset.filter(age=age)

    # regardless of who the user is, sort by name and age 
    sort = request.query_params.get('sort')
    if sort:
      if sort.lower() == 'age':
        queryset = queryset.order_by('age')
      if sort.lower() == 'name':
        queryset = queryset.order_by('name')

    # pagination logic
    paginator = SearchPagination()
    
    page = paginator.paginate_queryset(queryset, request, view=self) # paginate the queryset
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return paginator.get_paginated_response(serializer.data)
       
    # return filtered results
    serializer = self.get_serializer(queryset, many=True)
    return Response(serializer.data)     

class ServePetPicture(RetrieveAPIView):
    permission_classes = [AllowAny]
    def get(self, request, filename):
        imagePath = settings.MEDIA_ROOT / 'pets' / filename
        try:
            return FileResponse(open(imagePath, 'rb'), content_type="image/jpeg")
        except FileNotFoundError:
            return HttpResponse("Image not found", status=404)
    