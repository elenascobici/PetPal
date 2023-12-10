from django.db import models
from accounts.models.ParentUserModel import ParentUser
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

class BlogComment(models.Model):
    text = models.CharField(max_length=350)
    time = models.DateTimeField(auto_now_add=True)

    def get_commented_blog(self):
        if hasattr(self, "blogresponse"):
            return self.blogresponse.commented_blog
        elif hasattr(self, "blogreply"):
            return self._get_blog_from_reply(self.blogreply)
        return None
        
    def _get_blog_from_reply(self, blog_reply):
        while blog_reply:
            if hasattr(blog_reply, "blogresponse"):
                return blog_reply.blogresponse.commented_blog
            blog_reply = blog_reply.comment
        return None
    
    def get_commenter(self):
        if hasattr(self, "blogresponse"):
            return self.blogresponse.commenter
        elif hasattr(self, "blogreply"):
            return self.blogreply.commenter
        return None


class BlogResponse(BlogComment):
    commenter = models.ForeignKey(ParentUser, related_name='responses', null=True,
                                     on_delete=models.SET_NULL)
    commented_blog = models.ForeignKey(Blog, related_name='blog_responses',
                                             on_delete=models.CASCADE)

    
class BlogReply(BlogComment):
    comment = models.ForeignKey(BlogComment, related_name='replies',
                                on_delete=models.CASCADE)
    commenter = models.ForeignKey(ParentUser, related_name='blog_replies', null=True,
                                     on_delete=models.SET_NULL)
    class Meta:
        verbose_name_plural = 'replies'