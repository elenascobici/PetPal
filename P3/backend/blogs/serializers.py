from rest_framework import serializers
from .models import Blog
from accounts.models.ShelterModel import Shelter

class BlogSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Blog
        fields = '__all__'

    def create(self, validated_data):
        # Retrieve the Shelter making the request
        userId = self.context['request'].user.id
        shelter = Shelter.objects.get(id=userId)

        # Set the author of the blog to the user sending the request
        validated_data['author'] = shelter

        # Create the blog with the author set
        blog = Blog.objects.create(**validated_data)
        return blog