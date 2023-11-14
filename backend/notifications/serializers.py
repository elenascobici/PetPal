from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import Notification


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
