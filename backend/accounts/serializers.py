from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter

class RegisterSeekerSerializer(ModelSerializer):
    # Require the user to provide the password and confirm it, do not
    # include these fields in the JSON response.
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    # Do not allow the user to write straight to the password field,
    # but include it in the JSON response.
    password = serializers.CharField(required=False, read_only=True)

    class Meta:
        model = Seeker
        fields = ['id', 'username', 'password', 'password1', 
                  'password2', 'email', 'province', 'phone', 
                  'street', 'city', 'profile_picture', 'preferences',
                  'first_name', 'last_name']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def create(self, validated_data):
        # Validate passwords
        if validated_data['password1'] != validated_data['password2']:
            raise serializers.ValidationError({'password1': 'password1 and password2 do not match.'})
        
        # Create the Seeker object
        Seeker.objects.create_user(validated_data['username'])
        newUser = Seeker.objects.get(username=validated_data['username'])
        newUser.set_password(validated_data['password1']) # hash password
        newUser.user_type = 'Seeker'
        for attr, value in validated_data.items():
            if attr not in ['user_type', 'id', 'username', 'password1', 'password2']:
                setattr(newUser, attr, value)
        newUser.save()
        return newUser

class RegisterShelterSerializer(ModelSerializer):
    # Require the user to provide the password and confirm it, do not
    # include these fields in the JSON response.
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    # Do not allow the user to write straight to the password field,
    # but include it in the JSON response.
    password = serializers.CharField(required=False, read_only=True)

    class Meta:
        model = Shelter
        fields = ['id', 'username', 'password', 'password1', 
                  'password2', 'email', 'province', 'profile_picture', 
                  'name', 'website_link', 'preferred_contact', 
                  'mission_statement']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    
    def create(self, validated_data):
        # Validate passwords
        if validated_data['password1'] != validated_data['password2']:
            raise serializers.ValidationError({'password1': 'password1 and password2 do not match.'})
        
        # Create the Shelter object
        Shelter.objects.create_user(validated_data['username'])
        newUser = Shelter.objects.get(username=validated_data['username'])
        newUser.set_password(validated_data['password1']) # hash password
        newUser.user_type = 'Shelter'
        for attr, value in validated_data.items():
            if attr not in ['user_type', 'id', 'username', 'password1', 'password2']:
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
    
class ViewSeekerSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = ['username', 'email', 'province', 'phone', 
                  'street', 'city', 'profile_picture', 'preferences',
                  'first_name', 'last_name']

class ViewShelterSerializer(ModelSerializer):
    class Meta:
        model = Shelter
        fields = ['username', 'email', 'province', 'profile_picture', 
                  'name', 'website_link', 'preferred_contact', 
                  'mission_statement']


    