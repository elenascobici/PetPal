from django.db import models
from django.contrib.auth.models import User
from accounts.models.models import Shelter, ParentUser

class Comment(models.Model):
    text = models.TextField(max_length=600)
    time = models.DateTimeField(auto_now_add=True)
    commentor_id = models.ForeignKey(ParentUser, related_name="comments",
                                     on_delete=models.CASCADE)
    class Meta:
        abstract = True

class Review(Comment):
    commented_shelter_id = models.ForeignKey(Shelter, related_name="reviews",
                                             on_delete=models.CASCADE)
    
class Reply(Comment):
    comment = models.ForeignKey(Review, related_name='replies',
                                on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'replies'