from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter

class RegisterSeekerSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = ['id', 'username', 'password', 'email', 'province', 'phone', 
                  'street', 'city', 'profile_picture', 'preferences',
                  'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def create(self, validated_data):
        Seeker.objects.create_user(validated_data['username'])
        newUser = Seeker.objects.get(username=validated_data['username'])
        newUser.user_type = 'Seeker'
        for attr, value in validated_data.items():
            if attr == 'password':
                newUser.set_password(value) # hash password
            elif attr != 'user_type' and attr != 'id':
                setattr(newUser, attr, value)
        newUser.save()
        return newUser
    
class RegisterShelterSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = ['username', 'password', 'email', 'province', 'name', 
                  'website_link', 'preferred_contact', 
                  'mission_statement']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        Shelter.objects.create_user(validated_data['username'])
        newUser = Shelter.objects.get(username=validated_data['username'])
        newUser.user_type = 'Shelter'
        for attr, value in validated_data.items():
            if attr == 'password':
                newUser.set_password(value) # hash password
            elif attr != 'user_type':
                setattr(newUser, attr, value)
        newUser.save()
        return newUser

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
                instance.set_password(value) # hash password
            elif attr != 'username' and attr != 'user_type':
                setattr(instance, attr, value)
        instance.save()
        return instance
    
class UpdateShelterSerializer(ModelSerializer):
    password = serializers.CharField(required=False)
    email = serializers.CharField(required=False)
    province = serializers.CharField(required=False)
    name = serializers.CharField(required=False)

    class Meta:
        model = Shelter
        # User should not be able to change their username.
        fields = ['password', 'email', 'province', 'name', 
                  'website_link', 'preferred_contact', 
                  'mission_statement']
    
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value) # hash password
            elif attr != 'username' and attr != 'user_type':
                setattr(instance, attr, value)
        instance.save()
        return instance


    