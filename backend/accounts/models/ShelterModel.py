from django.db import models
from accounts.models.ParentUserModel import ParentUser

"""
Define the Shelter class, which inherits from ParentUser and
represents a user with a Pet Shelter account.

Author: Elena Scobici
"""

class Shelter(ParentUser):
    name = models.CharField(max_length=30)
    website_link = models.URLField(null=True, blank=True)
    preferred_contact = models.CharField(choices=['Phone', 'Email']
                                         , default='Email')
    mission_statement = models.TextField(null=True, blank=True)
