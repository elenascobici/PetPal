# Generated by Django 4.2 on 2023-11-15 04:42

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PetDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('status', models.CharField(choices=[('Available', 'Available'), ('Adopted', 'Adopted'), ('Pending', 'Pending'), ('Withdrawn', 'Withdrawn')], default='Available', max_length=20)),
                ('gender', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], max_length=20)),
                ('age', models.PositiveIntegerField(default=0)),
                ('colour', models.CharField(max_length=20)),
                ('type', models.CharField(choices=[('Cat', 'Cat'), ('Dog', 'Dog'), ('Aquatic', 'Aquatic'), ('Birds', 'Birds'), ('Other', 'Other')], default='Other', max_length=20)),
                ('location', models.CharField(max_length=30)),
                ('size', models.CharField(choices=[('Small', 'Small'), ('Medium', 'Medium'), ('Large', 'Large')], max_length=20)),
                ('behaviour', models.CharField(choices=[('Friendly', 'Friendly'), ('Shy', 'Shy'), ('Aggressive', 'Aggressive')], max_length=20)),
                ('description', models.TextField(blank=True, null=True)),
                ('medical_history', models.TextField(blank=True, null=True)),
                ('deadline', models.DateField(default=django.utils.timezone.now)),
                ('pet_image_1', models.ImageField(upload_to='pets/')),
                ('shelter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.shelter')),
            ],
        ),
    ]
