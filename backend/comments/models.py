from django.db import models
from accounts.models.ParentUserModel import ParentUser
from accounts.models.ShelterModel import Shelter
from applications.models import Application

class Comment(models.Model):
    text = models.TextField(max_length=600)
    time = models.DateTimeField(auto_now_add=True)

class Rating(models.Model):
    user = models.ForeignKey(ParentUser, related_name="user_rating",
                                     on_delete=models.CASCADE)
    shelter = models.ForeignKey(Shelter, related_name="shelter_rating",
                                     on_delete=models.CASCADE)
    value = models.PositiveIntegerField(
        choices=[
            (1, '1'),
            (2, '2'),
            (3, '3'),
            (4, '4'),
            (5, '5'),
        ]
    )

class Review(Comment):
    commentor_id = models.ForeignKey(ParentUser, related_name='review_comments',
                                     on_delete=models.CASCADE)
    commented_shelter_id = models.ForeignKey(Shelter, related_name='reviews',
                                             on_delete=models.CASCADE)
    rating = models.ForeignKey(Rating, null=True, blank=True, on_delete=models.SET_NULL)
    
class Reply(Comment):
    comment = models.ForeignKey(Comment, related_name='replies',
                                on_delete=models.CASCADE)
    commentor_id = models.ForeignKey(ParentUser, related_name='reply_comments',
                                     on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'replies'

class Message(models.Model):
    sender = models.ForeignKey(ParentUser, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=False)
    application = models.ForeignKey(Application, related_name='messages', on_delete=models.CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        # Always update Application last_update time
        self.application.last_update = self.creation_time
        super(Message, self).save(*args, **kwargs)