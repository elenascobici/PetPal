from django.db import models
from . import ParentUserModel

"""
Define the ShelterModel class, which inherits from ParentUserModel and
represents a user with a Pet Shelter account.

Author: Elena Scobici
"""

class ShelterModel(ParentUserModel):
    name = models.CharField(max_length=30)
    website_link = models.URLField(null=True, blank=True)
    preferred_contact = models.CharField(null=True, blank=True,
                                         choices=['Phone', 'Email'])
    mission_statement = models.TextField(null=True, blank=True)
