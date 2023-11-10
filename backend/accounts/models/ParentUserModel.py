from django.db import models
from django.contrib.auth.models import User

"""
Define the ParentUserModel class.

Author: Elena Scobici
"""

class ParentUser(User):
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=20)
    email = models.EmailField()
    phone = models.CharField(null=True, blank=True)
    street = models.CharField(null=True, blank=True, max_length=50)
    city = models.CharField(null=True, blank=True, max_length=50)
    province = models.CharField(
        choices=['Alberta', 'British Columbia', 'Manitoba', 
                'New Brunswick', 'Newfoundland and Labrador', 
                'Nova Scotia', 'Ontario', 'Prince Edward Island', 
                'Quebec', 'Saskatchewan'])
    profile_picture = models.ImageField(null=True, blank=True)
    