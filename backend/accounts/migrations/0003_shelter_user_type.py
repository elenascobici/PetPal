# Generated by Django 4.2 on 2023-11-13 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_seeker_user_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='shelter',
            name='user_type',
            field=models.CharField(default='Shelter', max_length=6),
        ),
    ]
