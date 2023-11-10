from django.db import models
from . import ParentUserModel

"""
Define the SeekerModel class, which inherits from ParentUserModel and
represents a user with a Pet Seeker account.

Author: Elena Scobici
"""

class SeekerModel(ParentUserModel):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    preferences = models.CharField(null=True, blank=True, max_length=100)