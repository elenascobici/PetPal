from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication

from accounts.serializers import SeekerSerializer, ShelterSerializer, RegisterSeekerSerializer, RegisterShelterSerializer

class RegisterSeekerView(GenericAPIView):
    serializer_class = RegisterSeekerSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": SeekerSerializer(user, context=self.get_serializer_context()).data,
            "message": "Seeker account created successfully. Login to get your auth token."
        })
    
class RegisterShelterView(GenericAPIView):
    serializer_class = RegisterShelterSerializer
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": ShelterSerializer(user, context=self.get_serializer_context()).data,
            "message": "Shelter account created successfully. Login to get your auth token."
        })