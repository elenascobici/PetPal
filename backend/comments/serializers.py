from rest_framework import serializers
from accounts.models.models import Shelter, ParentUser
from .models import Comment, Review, Reply, Rating

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CommentDetailSerializer(serializers.ModelSerializer):
    text = serializers.TextField(max_length=600, required=False)
    rating = serializers.IntegerField(min_value=1, max_value=5, required=False)

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'