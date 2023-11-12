from rest_framework.serializers import ModelSerializer
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
        return user

class SeekerSerializer(ModelSerializer):
    class Meta:
        model = Seeker
        fields = '__all__'