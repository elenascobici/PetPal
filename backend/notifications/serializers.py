from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField
from rest_framework import serializers
from .models import Notification
from applications.models import Application
from comments.models import Comment, Message
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

    def get_url(self, obj):
        event_id = obj.id_event
        event = obj.event
        url = ''

        if isinstance(event, Application):
            url = reverse('applications:view_application', kwargs={'app_id': event_id})
        elif isinstance(event, Comment):
            shelter_id = event.get_commented_shelter().id
            url = reverse('comments:comment', kwargs={'shelter_id': shelter_id})
        elif isinstance(event, Message):
            application_id = event.application.id
            url = reverse('comments:messages', kwargs={'pk': application_id})
        elif isinstance(event, PetDetail):
            url = reverse('pets:pet-detail', kwargs={'pet_id': event_id})
        return url
