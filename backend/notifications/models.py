from django.db import models
from accounts.models.ParentUserModel import ParentUser
from django.contrib.contenttypes.models import ContentType


class Notification(models.Model):
    user = models.ForeignKey(ParentUser, related_name="notifications",
                             on_delete=models.CASCADE)
    sender = models.ForeignKey(ParentUser, related_name="sent_notification",
                               on_delete=models.CASCADE)
    event = models.ForeignKey(ContentType, null=True, on_delete=models.SET_NULL)
    text = models.CharField(max_length=400)
    time = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

