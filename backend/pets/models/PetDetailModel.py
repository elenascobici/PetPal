from django.db import models
from accounts.models.ShelterModel import Shelter

class PetDetail(models.Model):
    
    status_choices = [
        ('AVAILABLE', 'Available'),
        ('ADOPTED', 'Adopted'),
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

    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=status_choices, default='AVAILABLE')
    gender = models.CharField(max_length=20, choices=gender_choices, default='N/A')
    age = models.IntegerField(default=0)
    colour = models.CharField(max_length=20, default='N/A')
    breed = models.CharField(max_length=20, default='N/A')
    location = models.CharField(max_length=30, default='N/A')
    size = models.CharField(max_length=20, choices=size_choices, default='N/A')
    behaviour = models.CharField(max_length=20, choices=behaviour_choices, default='N/A')
    description = models.TextField(blank=True, null=True)
    medical_history = models.TextField(blank=True, null=True)

    pet_image1 = models.ImageField(upload_to='pets/')
    pet_image2 = models.ImageField(upload_to='pets/')
    pet_image3 = models.ImageField(upload_to='pets/')
    pet_image4 = models.ImageField(upload_to='pets/')

