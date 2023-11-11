from rest_framework import serializers
from accounts.models.ParentUserModel import ParentUser
from accounts.models.ShelterModel import Shelter
from .models import Comment, Review, Reply, Rating, Message

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CommentDetailSerializer(serializers.ModelSerializer):
    text = serializers.CharField(max_length=600, required=True)
    rating = serializers.IntegerField(min_value=1, max_value=5, required=False)

class ReplySerializer(serializers.ModelSerializer):
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