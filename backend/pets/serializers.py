
from rest_framework import serializers
from .models.PetDetailModel import PetDetail
from rest_framework.response import Response

class PetSerializer(serializers.ModelSerializer):
  class Meta:
    model = PetDetail
    fields = ['name', 'status', 'gender', 'age', 'colour', 'breed', 'location', 'size', 'behaviour', 'description', 'medical_history', 'pet_image1', 'pet_image2', 'pet_image3', 'pet_image4']

  def validate(self, data):
    required_fields = ['name', 'status', 'gender', 'age', 'colour', 'breed', 'location', 'size', 'behaviour', 'pet_image1', 'pet_image2', 'pet_image3', 'pet_image4']

    for field in required_fields:
      if field not in data or not data[field]:
        return Response({"detail": f"The {field} field is required"})