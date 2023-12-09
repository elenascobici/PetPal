from django.db import models
from accounts.models.ParentUserModel import ParentUser
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


class Notification(models.Model):
    user = models.ForeignKey(ParentUser, related_name="notifications",
                             on_delete=models.CASCADE)
    sender = models.ForeignKey(ParentUser, related_name="sent_notification",
                               on_delete=models.CASCADE)
    event_type = models.ForeignKey(ContentType, null=True, on_delete=models.SET_NULL)
    id_event = models.PositiveIntegerField(null=True)
    event = GenericForeignKey('event_type', 'id_event')
    text = models.CharField(max_length=400)
    time = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=True)

