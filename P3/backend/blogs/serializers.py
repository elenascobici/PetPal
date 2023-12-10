from django.shortcuts import get_object_or_404
from rest_framework import serializers
from .models import Blog, BlogComment, BlogReply, BlogResponse, Like
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
    

class BlogCommentSerializer(serializers.ModelSerializer):
    commenter_display_name = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogComment
        fields = '__all__'
    
    def get_commenter_display_name(self, comment):
        if not comment.commenter.is_active:
            return "Deleted User"
        user = comment.commenter
        if user.get_user_type() == "Shelter":
            return Shelter.objects.get(pk=user.id).name
        return user.username
    
    def get_replies(self, comment):
        replies = comment.replies.all()
        reply_serializer = BlogReplySerializer(replies, many=True)

        for reply_data in reply_serializer.data:
            reply = BlogReply.objects.get(pk=reply_data['id'])
            reply_data['replies'] = self.get_replies(reply)

        return reply_serializer.data

class BlogResponseSerializer(BlogCommentSerializer):
    class Meta:
        model = BlogResponse
        fields = '__all__'
        extra_kwargs = {'commented_blog': {'required': False}}



class BlogReplySerializer(BlogCommentSerializer):
    class Meta:
        model = BlogReply
        fields = '__all__'
        extra_kwargs = {'comment': {'required': False}}

    def create(self, validated_data):
        comment_id = validated_data.pop('comment').id
        comment = get_object_or_404(BlogComment, pk=comment_id)
        instance = BlogReply.objects.create(comment=comment, **validated_data)
        return instance