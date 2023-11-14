from rest_framework.serializers import ModelSerializer, CharField, PrimaryKeyRelatedField, ChoiceField
from applications.models import Application 
from django.shortcuts import get_object_or_404
from pets.models.PetDetailModel import PetDetail

# All the validation is done in the view, all you do here is to handle how to display
class ApplicationSerializer(ModelSerializer):

    adopter = PrimaryKeyRelatedField(read_only=True)
    pet= PrimaryKeyRelatedField(read_only=True)

    status_choices = [
            ('P', 'Pending'),
            ('Y', 'Accepted'),
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
            ('NT', 'Northwest Territories'),
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
        ('FLO', 'Floating Home'),
        ('IGL', 'Igloo'),
    ]   

    # pet_name = CharField(max_length=20, read_only=True)

    # Shows user human-readable portion of the tuples
    status = ChoiceField(choices=status_choices, required=False)
    province = ChoiceField(choices=province_choices)
    home = ChoiceField(choices=home_types)

    class Meta:
        model = Application
        fields = '__all__'
        # exclude = ['last_update', 'creation_time']


    # def __init__(self, *args, **kwargs):
    #     pet_id = self.context.get('pet_id')
    #     pet = get_object_or_404(PetDetail, id=pet_id)
    #     super(ApplicationSerializer, self).__init__(*args, **kwargs)

    #     self.fields['pet_name'].default = pet.name