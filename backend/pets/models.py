from django.db import models
from accounts.models.ShelterModel import Shelter

class PetDetail(models.Model):

    status_choices = [
        ('Available', 'Available'),
        ('Adopted', 'Adopted'),
        ('Pending', 'Pending'),
        ('Withdrawn', 'Withdrawn'),
    ]

    gender_choices = [
        ('Male', 'Male'),
        ('Female', 'Female'),
    ]

    size_choices = [
        ('Small', 'Small'),
        ('Medium', 'Medium'),
        ('Large', 'Large'),
    ]

    behaviour_choices = [
        ('Friendly', 'Friendly'),
        ('Shy', 'Shy'),
        ('Aggressive', 'Aggressive'),
    ]

    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    name = models.CharField(max_length=20)
    status = models.CharField(max_length=20, choices=status_choices, default='Available')
    gender = models.CharField(max_length=20, choices=gender_choices)
    age = models.PositiveIntegerField(default=0)
    colour = models.CharField(max_length=20)
    breed = models.CharField(max_length=20)
    location = models.CharField(max_length=30)
    size = models.CharField(max_length=20, choices=size_choices)
    behaviour = models.CharField(max_length=20, choices=behaviour_choices)
    description = models.TextField(blank=True, null=True)
    medical_history = models.TextField(blank=True, null=True)
    pet_image1 = models.ImageField(upload_to='pets/')



