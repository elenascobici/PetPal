from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField
from rest_framework import serializers
from .models import Notification
from applications.models import Application
from comments.models import Comment
from pets.models import PetDetail
from django.urls import reverse


class NotificationSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(read_only=True)
    sender = PrimaryKeyRelatedField(read_only=True)
    event = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'

class NotificationGetSerializer(ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['text', 'time', 'read', 'url']

    def get_url(self):
        associated_event = self.event
        url = ''
        if isinstance(associated_event, type(Application)):
            url = reverse('applications:view_application', {'app_id':associated_event.id})
        elif isinstance(associated_event, type(Comment)):
            shelter_id = associated_event.get_commented_shelter().id
            url = reverse('comments:comment', {'shelter_id': shelter_id, 'user_id': associated_event.id})
        elif isinstance(associated_event, type(PetDetail)):
            url = reverse('pets:pet-detail', {'pet_id': associated_event.id})
        return url
