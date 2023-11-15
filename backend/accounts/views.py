from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter
from accounts.permissions import ProfileViewPermissions
from accounts.models.ParentUserModel import ParentUser
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from accounts import serializers

class RegisterSeekerView(CreateAPIView):
    serializer_class = serializers.RegisterSeekerSerializer
    permission_classes = [AllowAny]
    
class RegisterShelterView(CreateAPIView):
    serializer_class = serializers.RegisterShelterSerializer
    permission_classes = [AllowAny]

class ListSheltersView(ListAPIView):
    serializer_class = serializers.ViewShelterSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Shelter.objects.all()

class RetrieveUpdateDestroyAccountView(RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        match self.request.method:
            case 'PUT' | 'PATCH':
                if self.request.user.user_type == 'Seeker':
                    return serializers.UpdateSeekerSerializer
                return serializers.UpdateShelterSerializer
            case 'GET':
                match ParentUser.objects.get(id=self.kwargs['pk']).user_type:
                    case 'Seeker':
                        return serializers.ViewSeekerSerializer
                    case 'Shelter':
                        return serializers.ViewShelterSerializer
    
    def get_queryset(self):
        match self.request.method:
            case 'PUT' | 'PATCH':
                if self.request.user.user_type == 'Seeker':
                    return Seeker.objects.all()
                return Shelter.objects.all()
            case 'GET':
                if ParentUser.objects.get(id=self.kwargs['pk']).user_type == 'Seeker':
                    return Seeker.objects.all()
                return Shelter.objects.all()
    
    def get_permissions(self):
        match self.request.method:
            case 'PUT' | 'PATCH' | 'DELETE':
                return [IsAuthenticated()]
            case 'GET':
                return [IsAuthenticated(), ProfileViewPermissions()]
    
    def get_object(self):
        match self.request.method:
            case 'PUT' | 'PATCH':
                return self.get_queryset().get(id=self.request.user.id)
            case 'GET':
                return super().get_object()
            case 'DELETE':
                return self.request.user
    
    def perform_update(self, serializer):
        if serializer is None:
            return
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)