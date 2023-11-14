
from rest_framework import serializers
from .models import PetDetail
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

class PetSerializer(serializers.ModelSerializer):
  class Meta:
    model = PetDetail
    fields = ['id', 'shelter', 'name', 'status', 'gender', 'age', 'colour', 'breed', 'location', 'size', 'behaviour', 'description', 'medical_history', 'pet_image1']

    # these fields are not required
    extra_kwargs = {
      'description': {'required': False},
      'medical_history': {'required': False},
    }