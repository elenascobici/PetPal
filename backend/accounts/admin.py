from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models.ParentUserModel import ParentUser

admin.site.register(ParentUser, UserAdmin)