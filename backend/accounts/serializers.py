from rest_framework.serializers import ModelSerializer, Serializer
from rest_framework import serializers
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter
from django.db import models
from django.http import HttpResponse

class RegisterSeekerSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = Seeker.objects.create_user(validated_data['username'], password=validated_data['password'])
        user.is_active = True
        return user
    
class RegisterShelterSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = Shelter.objects.create_user(validated_data['username'], password=validated_data['password'])
        user.is_active = True
        return user

class SeekerSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = '__all__'

class ShelterSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = '__all__'

class UpdateSeekerSerializer(ModelSerializer):
    password = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    province = serializers.CharField(required=False)

    class Meta:
        model = Seeker
        # User should not be able to change their username.
        fields = ['password', 'email', 'province', 'phone', 'street', 
                  'city', 'profile_picture', 'preferences']
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)
        instance.save()
        return instance


    