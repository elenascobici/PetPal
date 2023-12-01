from django.db import models
from accounts.models.ParentUserModel import ParentUser

"""
Define the Seeker model class, which inherits from ParentUser and
represents a user with a Pet Seeker account.

Author: Elena Scobici
"""

class Seeker(ParentUser):
    preferences = models.BooleanField(default=False)