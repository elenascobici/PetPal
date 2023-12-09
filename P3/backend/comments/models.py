from django.db import models
from accounts.models.ParentUserModel import ParentUser
from accounts.models.ShelterModel import Shelter
from applications.models import Application

class Comment(models.Model):
    text = models.CharField(max_length=350)
    time = models.DateTimeField(auto_now_add=True)

    def get_commented_shelter(self):
        if hasattr(self, "review"):
            return self.review.commented_shelter
        elif hasattr(self, "reply"):
            return self._get_shelter_from_reply(self.reply)
        return None
        
    def _get_shelter_from_reply(self, reply):
        while reply:
            if hasattr(reply, "review"):
                return reply.review.commented_shelter
            reply = reply.comment
        return None
    
    def get_commenter(self):
        if hasattr(self, "review"):
            return self.review.commenter
        elif hasattr(self, "reply"):
            return self.reply.commenter
        return None

class Rating(models.Model):
    user = models.ForeignKey(ParentUser, related_name="user_rating", null=True,
                                     on_delete=models.SET_NULL)
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
    commenter = models.ForeignKey(ParentUser, related_name='review_comments', null=True,
                                     on_delete=models.SET_NULL)
    commented_shelter = models.ForeignKey(Shelter, related_name='reviews',
                                             on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(null=True, blank=True,
        choices=[
            (1, '1'),
            (2, '2'),
            (3, '3'),
            (4, '4'),
            (5, '5'),
        ]
    )

    
class Reply(Comment):
    comment = models.ForeignKey(Comment, related_name='replies',
                                on_delete=models.CASCADE)
    commenter = models.ForeignKey(ParentUser, related_name='reply_comments', null=True,
                                     on_delete=models.SET_NULL)
    class Meta:
        verbose_name_plural = 'replies'

class Message(models.Model):
    sender = models.ForeignKey(ParentUser, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=False)
    application = models.ForeignKey(Application, related_name='messages', on_delete=models.CASCADE)
    creation_time = models.DateTimeField(auto_now_add=True)
