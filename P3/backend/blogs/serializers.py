from rest_framework import serializers
from .models import Blog, Like
from accounts.models.ShelterModel import Shelter
from accounts.models.SeekerModel import Seeker

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

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        print(instance.title)
        print(validated_data.get('title', instance.title))
        instance.save()
        return instance
    
    
class LikeSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    blog = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Like
        fields = '__all__'

    def create(self, validated_data):
        # Retrieve the Seeker making the request
        userId = self.context['request'].user.id
        seeker = Seeker.objects.get(id=userId)

        # Set the user making the like to the user sending the request
        validated_data['user'] = seeker

        # Create the blog with the author set
        like = Like.objects.create(**validated_data)
        return like