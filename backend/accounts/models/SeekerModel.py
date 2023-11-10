from django.db import models
from accounts.models.ParentUserModel import ParentUser

"""
Define the Seeker model class, which inherits from ParentUser and
represents a user with a Pet Seeker account.

Author: Elena Scobici
"""

class Seeker(ParentUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    preferences = models.CharField(null=True, blank=True, max_length=100)