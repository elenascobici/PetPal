from django.db import models
from django.contrib.auth.models import AbstractUser

"""
Define the ParentUser model class.

Author: Elena Scobici
"""

class ParentUser(AbstractUser):
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=20)
    email = models.EmailField()
    phone = models.CharField(null=True, blank=True, max_length=10)
    street = models.CharField(null=True, blank=True, max_length=50)
    city = models.CharField(null=True, blank=True, max_length=50)
    province = models.CharField(
        choices= [
            ('AB', 'Alberta'),
            ('BC', 'British Columbia'),
            ('MB', 'Manitoba'),
            ('NB', 'New Brunswick'),
            ('NL', 'Newfoundland and Labrador'),
            ('NS', 'Nova Scotia'),
            ('NT', 'Northwest Territories'),
            ('NU', 'Nunavut'),
            ('ON', 'Ontario'),
            ('PE', 'Prince Edward Island'),
            ('QC', 'Quebec'),
            ('SK', 'Saskatchewan'),
            ('YT', 'Yukon')
        ], null=True, blank=True, max_length=25)
    profile_picture = models.ImageField(default='accounts/default_profile.jpg', upload_to='accounts/')
    user_type = models.CharField(default="NONE", max_length=6)
    
    def get_user_type(self):
        if hasattr(self, "shelter"):
            return "Shelter"
        elif hasattr(self, "seeker"):
            return "Seeker"
        