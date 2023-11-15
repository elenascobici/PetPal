from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ChoiceField
from applications.models import Application 

# All the validation is done in the view, all you do here is to handle how to display
class ApplicationSerializer(ModelSerializer):

    adopter = PrimaryKeyRelatedField(read_only=True)
    pet= PrimaryKeyRelatedField(read_only=True)

    status_choices = [
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
        #! FIX to not allow modification of these two
        # exclude = ['last_update', 'creation_time']
