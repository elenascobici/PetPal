from django.db import models
from accounts.models.ShelterModel import Shelter

# Add a placeholder image when image not provided by shelter
def get_placeholder_image():
    return 'pets/placeholder.png'

class PetDetail(models.Model):

    status_choices = [
        ('AVAILABLE', 'Available'),
        ('ADOPTED', 'Adopted'),
        ('PENDING', 'Pending'),
        ('WITHDRAWN', 'Withdrawn'),
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
    # pet_image1 = models.ImageField(upload_to='pets/', default=get_placeholder_image)
    # pet_image2 = models.ImageField(upload_to='pets/', default=get_placeholder_image)
    # pet_image3 = models.ImageField(upload_to='pets/', default=get_placeholder_image)
    # pet_image4 = models.ImageField(upload_to='pets/', default=get_placeholder_image)



