from rest_framework import serializers
from accounts.models.ParentUserModel import ParentUser
from accounts.models.ShelterModel import Shelter
from .models import Comment, Review, Reply, Rating, Message

class CommentSerializer(serializers.ModelSerializer):
    commenter_display_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = '__all__'
    
    def get_commenter_display_name(self, comment):
        if not comment.commenter.is_active:
            return "Deleted User"
        user = comment.commenter
        if isinstance(user, Shelter):
            return user.name
        return user.username

class ReviewSerializer(CommentSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReplySerializer(CommentSerializer):
    class Meta:
        model = Reply
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'