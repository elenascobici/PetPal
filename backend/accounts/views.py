from rest_framework.generics import UpdateAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter
from accounts.permissions import ProfileViewPermissions
from accounts.models.ParentUserModel import ParentUser

from accounts import serializers

class RegisterSeekerView(CreateAPIView):
    serializer_class = serializers.RegisterSeekerSerializer
    permission_classes = [AllowAny]
    
class RegisterShelterView(CreateAPIView):
    serializer_class = serializers.RegisterShelterSerializer
    permission_classes = [AllowAny]
    
class UpdateAccountView(UpdateAPIView):
    def get_serializer_class(self):
        if self.request.user.user_type == 'Seeker':
            return serializers.UpdateSeekerSerializer
        return serializers.UpdateShelterSerializer
    
    def get_queryset(self):
        if self.request.user.user_type == 'Seeker':
            return Seeker.objects.all()
        return Shelter.objects.all()
    
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.get_queryset().get(id=self.request.user.id)
    
    def perform_update(self, serializer):
        if serializer is None:
            return
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class ViewProfileView(RetrieveAPIView):    
    permission_classes = [IsAuthenticated, ProfileViewPermissions]

    def get_serializer_class(self):
        match ParentUser.objects.get(id=self.kwargs['pk']).user_type:
            case 'Seeker':
                return serializers.ViewSeekerSerializer
            case 'Shelter':
                return serializers.ViewShelterSerializer
    
    def get_queryset(self):
        match ParentUser.objects.get(id=self.kwargs['pk']).user_type:
            case 'Seeker':
                return Seeker.objects.all()
            case 'Shelter':
                return Shelter.objects.all()