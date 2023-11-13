from rest_framework import viewsets
from .models.PetDetailModel import PetDetail
from .serializers import PetSerializer
from rest_framework.views import APIView


class PetViewSet(viewsets.ModelViewSet):
  queryset = PetDetail.objects.all()
  serializer_class = PetSerializer
