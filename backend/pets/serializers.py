
from rest_framework import serializers
from .models.PetDetailModel import PetDetail

class PetSerializer(serializers.ModelSerializer):
  class Meta:
    model = PetDetail
    fields = '__all__'