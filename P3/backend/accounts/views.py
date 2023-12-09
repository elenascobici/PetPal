from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter
from accounts.permissions import ProfileViewPermissions
from accounts.models.ParentUserModel import ParentUser
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import FileResponse, HttpResponse
from django.conf import settings
from rest_framework.pagination import PageNumberPagination


from accounts import serializers

class ShelterPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class LoginView(TokenObtainPairView):
    serializer_class = serializers.LoginSerializer

class RegisterSeekerView(CreateAPIView):
    serializer_class = serializers.RegisterSeekerSerializer
    permission_classes = [AllowAny]
    
class RegisterShelterView(CreateAPIView):
    serializer_class = serializers.RegisterShelterSerializer
    permission_classes = [AllowAny]

class ListSheltersView(ListAPIView):
    serializer_class = serializers.ViewShelterSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ShelterPagination

    def get_queryset(self):
        return Shelter.objects.all()

class RetrieveUpdateDestroyAccountView(RetrieveUpdateDestroyAPIView):
    def get_serializer_class(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            if self.request.user.user_type == 'Seeker':
                return serializers.UpdateSeekerSerializer
            return serializers.UpdateShelterSerializer
        elif self.request.method == 'GET':
            if ParentUser.objects.get(id=self.kwargs['pk']).user_type == 'Seeker':
                return serializers.ViewSeekerSerializer
            elif ParentUser.objects.get(id=self.kwargs['pk']).user_type == 'Shelter':
                return serializers.ViewShelterSerializer
    
    def get_queryset(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            if self.request.user.user_type == 'Seeker':
                return Seeker.objects.all()
            return Shelter.objects.all()
        elif self.request.method == 'GET':
                if ParentUser.objects.get(id=self.kwargs['pk']).user_type == 'Seeker':
                    return Seeker.objects.all()
                return Shelter.objects.all()
    
    def get_permissions(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH' or self.request.method == 'DELETE':
            return [IsAuthenticated()]
        elif self.request.method == 'GET':
            return [IsAuthenticated(), ProfileViewPermissions()]
    
    def get_object(self):
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return self.get_queryset().get(id=self.request.user.id)
        elif self.request.method == 'GET':
            return super().get_object()
        elif self.request.method == 'DELETE':
            return self.request.user
    
    def perform_update(self, serializer):
        if serializer is None:
            return
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)

class ServeProfilePictureView(RetrieveAPIView):
    permission_classes = [AllowAny]
    def get(self, request, filename):
        imagePath = settings.MEDIA_ROOT / 'accounts' / filename
        try:
            return FileResponse(open(imagePath, 'rb'), content_type="image/jpeg")
        except FileNotFoundError:
            return HttpResponse("Image not found", status=404)