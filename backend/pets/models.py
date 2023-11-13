from django.db import models
from accounts.models.ShelterModel import Shelter

class Pet(models.Model):
    
    status_choices = [
        ('AVAILABLE', 'Available'),
        ('ADOPTED', 'Adopted'),
        ('UNAVAILABLE', 'Unavailable'),
    ]

    gender_choices = [
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
    ]

    size_choices = [
        ('SMALL', 'Small'),
        ('MEDIUM', 'Medium'),
        ('LARGE', 'Large'),
    ]

    behaviour_choices = [
        ('FRIENDLY', 'Friendly'),
        ('SHY', 'Shy'),
        ('AGGRESSIVE', 'Aggressive'),
    ]

    shelter_id = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=status_choices, default='AVAILABLE')
    gender = models.CharField(max_length=20, choices=gender_choices, default='N/A')
    age = models.IntegerField(default='N/A')
    colour = models.CharField(max_length=20, default='N/A')
    breed = models.CharField(max_length=20, default='N/A')
    location = models.CharField(max_length=30, default='N/A')
    size = models.CharField(max_length=20, choices=size_choices, default='N/A')
    behaviour = models.CharField(max_length=20, choices=behaviour_choices, default='N/A')
    description = models.TextField(blank=True, null=True)
    medical_history = models.TextField(blank=True, null=True)

