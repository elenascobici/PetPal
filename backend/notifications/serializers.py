from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField
from rest_framework import serializers
from .models import Notification
from applications.models import Application
from comments.models import Comment
from pets.models import PetDetail
from django.urls import reverse
from django.contrib.contenttypes.models import ContentType


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
        event_type = self.event_type
        event_id = self.id_event
        event = self.event
        url = ''
        if event_type == ContentType.objects.get_for_model(Application):
            url = reverse('applications:view_application', {'app_id': event_id})
        elif event_type == ContentType.objects.get_for_model(Comment):
            shelter_id = event.get_commented_shelter().id
            url = reverse('comments:comment', {'shelter_id': shelter_id, 'user_id': event_id})
        elif event_type == ContentType.objects.get_for_model(PetDetail):
            url = reverse('pets:pet-detail', {'pet_id': event_id})
        return url
