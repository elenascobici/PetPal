from django.db import models
from accounts.models.ShelterModel import Shelter
from accounts.models.SeekerModel import Seeker

class Blog(models.Model):
    author = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)
    title = models.CharField(max_length=100)
    content = models.CharField(max_length=10000, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    banner_image = models.ImageField(null=True, blank=True, upload_to='blogs/')

class Like(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user = models.ForeignKey(Seeker, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'blog') # user can like blog only once

