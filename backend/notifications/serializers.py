from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField
from rest_framework import serializers
from .models import Notification


class NotificationSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(read_only=True)
    sender = PrimaryKeyRelatedField(read_only=True)
    event = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
