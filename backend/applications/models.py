from django.db import models
from django.utils import timezone
from accounts.models.SeekerModel import Seeker
from accounts.models.ParentUserModel import ParentUser

# Create your models here.
class Application(models.Model):

    status_choices = [
        # Check in form how are these displayed (want to display the human readable portion)
        ('P', 'Pending'),
        ('A', 'Accepted'),
        ('D', 'Declined'),
        ('W', 'Withdrawn'),
    ]

    province_choices = [
        ('ON', 'Ontario'),
        ('SK', 'Saskatchewan'),
        ('AL', 'Alberta'),
        ('NB', 'New Brunswick'),
        ('BC', 'British Columbia'),
        ('NW', 'Newfoundland and Labrador'),
        ('MB', 'Manitoba'),
        ('NS', 'Nova Scotia'),
        ('PE', 'Prince Edward Island'),
        ('QB', 'Quebec'),
        ('NU', 'Nunavut'),
        ('YK', 'Yukon'),
        ('NT', 'Northwest Territories')
    ]

    home_types = [
        ('SFH', 'Single-Family Home'),
        ('APT', 'Apartment'),
        ('CON', 'Condominium'),
        ('TNH', 'Townhouse'),
        ('DUP', 'Duplex'),
        ('TRI', 'Triplex'),
        ('MOH', 'Mobile Home'),
        ('TIN', 'Tiny House'), 
        ('MAN', 'Mansion'),
        ('BUN', 'Bungalow'),
        ('LOG', 'Log House'),
        ('LOG', 'Log House'),
        ('FLO', 'Floating Home'),
        ('IGL', 'Igloo')
    ]

    adopter_id = models.ForeignKey(Seeker, on_delete=models.CASCADE)
    # pet_id = models.ForeignKey(Pet)
    status = models.CharField(max_length=1, choices=status_choices)
    email = models.EmailField()
    phone = models.PositiveBigIntegerField()
    street = models.CharField(max_length=50, null=True, blank=True)
    city = models.CharField(max_length=50, null=True, blank=True)
    province = models.CharField(max_length=2, choices=province_choices)
    pet_name = models.CharField(max_length=20) #in form overwrite to be choicefield too
    reason = models.TextField()
    residents = models.TextField()
    home = models.CharField(max_length=3, choices=home_types)
    fenced_yard = models.BooleanField(default=False)
    owned_pets = models.TextField(null=True, blank=True) #list the names, ages and types currently in household
    other_pet_behavior = models.TextField(null=True, blank=True)
    residents = models.TextField(null=True, blank=True)
    vet_name = models.TextField(null=True, blank=True) # vet reference
    vet_contact = models.PositiveBigIntegerField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    last_update = models.DateTimeField()

    def save(self, *args, **kwargs):
        # Should only be true if the Application is first being made, 
        # else the time should be updated with the creation of the most 
        # recent message and make the time the same as the creation time 
        # of the message.
        if (self.last_update == None): 
            self.last_update = timezone.now()
        super(Application, self).save(*args, **kwargs)

# class Message(models.Model):
#     sender = models.ForeignKey(ParentUser)
#     content = models.TextField(null=False, blank=False)
#     application = models.ForeignKey(Application)
#     creation_time = models.DateTimeField()

#     def save(self, *args, **kwargs):
#         self.creation_time = timezone.now()
#         # Always update Application last_update time
#         self.application.last_update = self.creation_time
#         super(Message, self).save(*args, **kwargs)