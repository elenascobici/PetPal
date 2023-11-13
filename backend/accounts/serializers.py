from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter

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
        user.user_type = 'Seeker'
        user.save()
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
        user.user_type = 'Shelter'
        user.save()
        return user

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


    