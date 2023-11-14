
from rest_framework import serializers
from .models.PetDetailModel import PetDetail
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

class PetSerializer(serializers.ModelSerializer):
  class Meta:
    model = PetDetail
    fields = ['name', 'status', 'gender', 'age', 'colour', 'breed', 'location', 'size', 'behaviour', 'description', 'medical_history', 'pet_image1']

  # define which fields can be updated
  def update(self, instance, validated_data):
    instance.status = validated_data.get('status', instance.status)
    instance.age = validated_data.get('age', instance.age)
    instance.colour = validated_data.get('colour', instance.colour)
    instance.location = validated_data.get('location', instance.location)
    instance.size = validated_data.get('size', instance.size)
    instance.behaviour = validated_data.get('behaviour', instance.behaviour)
    instance.description = validated_data.get('description', instance.description)
    instance.medical_history = validated_data.get('medical_history', instance.medical_history)
    instance.pet_image1 = validated_data.get('pet_image1', instance.pet_image1)
