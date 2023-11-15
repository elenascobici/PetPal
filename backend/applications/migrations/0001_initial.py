# Generated by Django 4.2 on 2023-11-15 01:24

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('pets', '__first__'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Application',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('P', 'Pending'), ('A', 'Accepted'), ('D', 'Declined'), ('W', 'Withdrawn')], max_length=1)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.PositiveBigIntegerField()),
                ('street', models.CharField(max_length=50)),
                ('city', models.CharField(max_length=50)),
                ('province', models.CharField(choices=[('ON', 'Ontario'), ('SK', 'Saskatchewan'), ('AL', 'Alberta'), ('NB', 'New Brunswick'), ('BC', 'British Columbia'), ('NW', 'Newfoundland and Labrador'), ('MB', 'Manitoba'), ('NS', 'Nova Scotia'), ('PE', 'Prince Edward Island'), ('QB', 'Quebec'), ('NU', 'Nunavut'), ('YK', 'Yukon'), ('NT', 'Northwest Territories')], max_length=2)),
                ('reason', models.TextField()),
                ('home', models.CharField(choices=[('SFH', 'Single-Family Home'), ('APT', 'Apartment'), ('CON', 'Condominium'), ('TNH', 'Townhouse'), ('DUP', 'Duplex'), ('TRI', 'Triplex'), ('MOH', 'Mobile Home'), ('TIN', 'Tiny House'), ('MAN', 'Mansion'), ('BUN', 'Bungalow'), ('LOG', 'Log House'), ('FLO', 'Floating Home'), ('IGL', 'Igloo')], max_length=3)),
                ('fenced_yard', models.BooleanField(default=False)),
                ('owned_pets', models.TextField(blank=True, null=True)),
                ('other_pet_behavior', models.TextField(blank=True, null=True)),
                ('residents', models.TextField(blank=True, null=True)),
                ('vet_name', models.TextField(blank=True, null=True)),
                ('vet_contact', models.PositiveBigIntegerField(blank=True, null=True)),
                ('notes', models.TextField(blank=True, null=True)),
                ('last_update', models.DateTimeField(default=django.utils.timezone.now)),
                ('creation_time', models.DateTimeField(default=django.utils.timezone.now)),
                ('adopter', models.ForeignKey(default='deleted_user', on_delete=django.db.models.deletion.SET_DEFAULT, to='accounts.seeker')),
                ('pet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pets.petdetail')),
            ],
        ),
    ]
