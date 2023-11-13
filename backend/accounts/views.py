from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView, UpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models.SeekerModel import Seeker

from accounts.serializers import SeekerSerializer, ShelterSerializer, RegisterSeekerSerializer, RegisterShelterSerializer, UpdateSeekerSerializer

class RegisterSeekerView(CreateAPIView):
    serializer_class = RegisterSeekerSerializer
    permission_classes = [AllowAny]
    
class RegisterShelterView(CreateAPIView):
    serializer_class = RegisterShelterSerializer
    permission_classes = [AllowAny]
    
class UpdateSeekerView(UpdateAPIView):
    serializer_class = UpdateSeekerSerializer
    permission_classes = [IsAuthenticated]
    queryset = Seeker.objects.all()
    
    def get_object(self):
        return self.get_queryset().get(id=self.request.user.id)
    
    def perform_update(self, serializer):
        if serializer is None:
            return
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)