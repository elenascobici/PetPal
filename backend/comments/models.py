from django.db import models
from accounts.models.models import Shelter, ParentUser

class Comment(models.Model):
    text = models.TextField(max_length=600)
    time = models.DateTimeField(auto_now_add=True)
    commentor_id = models.ForeignKey(ParentUser, related_name="comments",
                                     on_delete=models.CASCADE)
    class Meta:
        abstract = True

class Rating(models.Model):
    user = models.ForeignKey(ParentUser, related_name="rating",
                                     on_delete=models.CASCADE)
    shelter = models.ForeignKey(Shelter, related_name="rating",
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
    commented_shelter_id = models.ForeignKey(Shelter, related_name="reviews",
                                             on_delete=models.CASCADE)
    rating = models.ForeignKey(Rating, null=True, blank=True, on_delete=models.SET_NULL)
    
class Reply(Comment):
    comment = models.ForeignKey(Review, related_name='replies',
                                on_delete=models.CASCADE)
    class Meta:
        verbose_name_plural = 'replies'

