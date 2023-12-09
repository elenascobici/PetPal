from rest_framework import serializers
from accounts.models.ParentUserModel import ParentUser
from accounts.models.ShelterModel import Shelter
from .models import Comment, Review, Reply, Rating, Message

class CommentSerializer(serializers.ModelSerializer):
    commenter_display_name = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = '__all__'
    
    def get_commenter_display_name(self, comment):
        if not comment.commenter.is_active:
            return "Deleted User"
        user = comment.commenter
        if user.get_user_type() == "Shelter":
            return Shelter.objects.get(pk=user.id).name
            # return user.name
        return user.username
    
    def get_replies(self, comment):
        replies = comment.replies.all()
        reply_serializer = ReplySerializer(replies, many=True)

        for reply_data in reply_serializer.data:
            reply = Reply.objects.get(pk=reply_data['id'])
            reply_data['replies'] = self.get_replies(reply)

        return reply_serializer.data

class ReviewSerializer(CommentSerializer):
    rating = serializers.IntegerField(default=None)
    class Meta:
        model = Review
        fields = '__all__'
        extra_kwargs = {'commented_shelter': {'required': False}}



class ReplySerializer(CommentSerializer):
    class Meta:
        model = Reply
        fields = '__all__'
        extra_kwargs = {'comment': {'required': False}}

class RatingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True) 
    class Meta:
        model = Rating
        fields = '__all__'
        extra_kwargs = {'shelter': {'required': False}}
        

class MessageSerializer(serializers.ModelSerializer):
    # sender_name = serializers.SerializerMethodField()
    class Meta:
        model = Message
        fields = '__all__'
        extra_kwargs = {'sender': {'required': False},
                        'application': {'required': False}}

    # def get_sender_name(self, message):
    #     print(message.sender)
    #     if not message.sender.is_active:
    #         return "Deleted User"
    #     user = message.sender
    #     if user.get_user_type() == "Shelter":
    #         return user.name
    #     return user.username