# Generated by Django 4.2 on 2023-11-13 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='seeker',
            name='user_type',
            field=models.CharField(default='Seeker', max_length=6),
        ),
    ]