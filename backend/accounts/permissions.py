from rest_framework import permissions
from accounts.models.ParentUserModel import ParentUser
from accounts.models.ShelterModel import Shelter

class ProfileViewPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        profile_user = ParentUser.objects.get(id=view.kwargs['pk'])
        requesting_user = request.user

        # Any user should be able to see their own profile
        if profile_user.id == requesting_user.id:
            return True

        # Any user can see the profile of a Shelter.
        if profile_user.user_type == 'Shelter':
            return True
        
        # Otherwise, the profile that the user wants to view is a
        # Seeker's profile; requesting user must be a Shelter with an
        # active application with that Seeker.
        if requesting_user.user_type == 'Seeker':
            return False
        requesting_user = Shelter.objects.get(id=request.user.id)
        requester_pets = requesting_user.petdetail_set.all()
        for pet in requester_pets:
            if len(pet.application_set.all().filter(adopter=profile_user)) > 0:
                return True
        return False