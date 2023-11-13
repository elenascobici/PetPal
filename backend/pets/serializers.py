
from rest_framework import serializers
from .models.PetDetailModel import PetDetail
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

class PetSerializer(serializers.ModelSerializer):
  class Meta:
    model = PetDetail
    fields = ['name', 'status', 'gender', 'age', 'colour', 'breed', 'location', 'size', 'behaviour', 'description', 'medical_history', 'pet_image1']
