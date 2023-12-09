from .serializers import ApplicationSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView
from django.shortcuts import get_object_or_404
from pets.models import PetDetail
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter
from applications.models import Application
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated, PermissionDenied
from rest_framework.pagination import PageNumberPagination
from django.utils import timezone
from notifications.models import Notification


class ApplicationCreateView(CreateAPIView):
    serializer_class = ApplicationSerializer

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            raise NotAuthenticated(detail="Authentication failed")
        # Check if user is a seeker
        if self.request.user.user_type.strip() != 'Seeker':
            raise PermissionDenied(detail="Shelters cannot submit applications")

        serializer.is_valid()
        user_data = serializer.validated_data 
        # Do not let user modify some fields
        user_data['last_update'] = None
        user_data['creation_time'] = None
        # Do not let user modify status aka anything they write will be overriden
        user_data['status'] = 'P'
        adopter = get_object_or_404(Seeker, id=self.request.user.pk)

        # Check if pet exists and modify its status:
        pet = get_object_or_404(PetDetail, id=self.kwargs['pet_id'])

        # Do not let anyone else adopt if set to Unavailable
        if pet.status == 'Withdrawn':
            raise PermissionDenied(detail="Pet is not available to adopt")
        elif pet.status == 'Adopted':
            raise PermissionDenied(detail='Pet has already been adopted')
        elif pet.status == 'Pending':
            raise PermissionDenied(detail='Deadline has passed')
        
        # Check if the user already applied for the pet before
        queryset = Application.objects.filter(adopter__id = self.request.user.pk, pet__id = self.kwargs['pet_id'])
        if queryset.exists():
            raise PermissionDenied(detail='Cannot adopt the same pet again.')
        
        serializer.is_valid()
        event = serializer.save(adopter=adopter, pet=pet)
        name = self.request.user.username

        Notification.objects.create(user=pet.shelter, sender=self.request.user, event=event, 
                                                        text=f"{name} has sent in an application")

        return Response(serializer.data, status=201)

class ApplicationPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class ApplicationListView(ListAPIView):
    serializer_class = ApplicationSerializer
    pagination_class = ApplicationPagination

    def get_queryset(self):
        status = self.request.query_params.get('status')

        if status != '':
            #validate status:
            if status == 'pending':
                status_code = 'P'
            elif status == 'accepted':
                status_code = 'A'
            elif status == 'declined':
                status_code = 'D'
            elif status == 'withdrawn':
                status_code = 'W'
            else:
                #Some error
                raise PermissionDenied(detail="No such status filter exists.")
        

            if (self.request.user.user_type == 'Seeker'):
                # only return the applications where the adopter_id is the seeker
                queryset = Application.objects.filter(adopter=self.request.user.pk, status=status_code)
                
            elif (self.request.user.user_type == 'Shelter'):
                queryset = Application.objects.filter(pet__shelter__pk = self.request.user.pk, status=status_code)
            else:
                raise PermissionDenied(detail="Invalid user")
        else:

            if (self.request.user.user_type == 'Seeker'):
                # only return the applications where the adopter_id is the seeker
                queryset = Application.objects.filter(adopter=self.request.user.pk)
        
            elif (self.request.user.user_type == 'Shelter'):
                queryset = Application.objects.filter(pet__shelter__id = self.request.user.pk)
            else:
                #return forbidden access response
                raise PermissionDenied(detail="Invalid user")

        # validate ordering field
        type = self.request.query_params.get('type') # should only be able to store "creation_time" or "last_update" or "none"
        if type != '':
        
            if type == 'creation-time':
                field = '-creation_time'
            elif type == 'last-update':
                field = '-last_update'
            else:
                raise PermissionDenied(detail="Invalid field to sort by")

            queryset = queryset.order_by(field)
        # else if none then do nothing.
    
        return queryset
    
class ApplicationRetrieveUpdateView(RetrieveUpdateAPIView):
    serializer_class = ApplicationSerializer

    def get_object(self):
        application = get_object_or_404(Application, id=self.kwargs['app_id'])
        # Check if the current user is allowed to view this application:
        if (self.request.user.user_type == 'Seeker'):
            if (application.adopter.id != self.request.user.pk):
                raise PermissionDenied(detail="Cannot view someone else's application")
        elif (self.request.user.user_type == 'Shelter'):
            if (application.pet.shelter.id != self.request.user.pk):
                raise PermissionDenied(detail="Cannot view someone else's application")
        else: 
            raise PermissionDenied(detail='Invalid user')
        
        return application

    
    def perform_update(self, serializer):
        if not self.request.user.is_authenticated:
            raise NotAuthenticated(detail="Authentication failed")
        
        application = self.get_object()
        user_data = serializer.validated_data # contains data supplied by the user

        if (self.request.user.user_type == 'Seeker'):
            serializer.is_valid()
            for field in user_data:
                if field != 'status': # cus we want to let them modify the status
                    if getattr(application, application._meta.get_field(field).attname) != user_data[field]:
                        raise PermissionDenied(detail='Cannot modify this field')

                
            if (application.status == 'P' or application.status == 'A') and user_data['status'] == 'W':
                event = serializer.save()

                name = self.request.user.username
                Notification.objects.create(user=application.pet.shelter, sender=self.request.user, event=event, 
                                                        text=f"{name} has withdrawn their application")

                return Response(serializer.data)
            
        elif self.request.user.user_type == 'Shelter':
            serializer.is_valid()
            for field in user_data:
                if field != 'status': # cus we want to let them modify the status
                    if getattr(application, application._meta.get_field(field).attname) != user_data[field]:
                        raise PermissionDenied(detail='Cannot modify this field')
            
            if application.status == 'P' and (user_data['status'] == 'D' or user_data['status'] == 'A'):
                event = serializer.save()

                shelter = get_object_or_404(Shelter, pk=self.request.user.id)
                name = shelter.name

                if(user_data['status'] == 'Y'):
                    Notification.objects.create(user=application.adopter, sender=self.request.user, event=event, 
                                                        text=f"{name} approved your application")
                else:
                    Notification.objects.create(user=application.adopter, sender=self.request.user, event=event, 
                                                        text=f"{name} declined your application")



                # If someones application was accepted, decline everyone else's
                if (user_data['status'] == 'A'):
                    # Set the pet to adopted
                    application.pet.status = 'Adopted'
                    application.pet.save()

                    queryset = Application.objects.filter(pet = application.pet)

                    for app in queryset:
                        # Check if the app was the one that was accepted
                        if (app.status != 'A' and app.status != 'W'):
                            app.status = 'D'
                            app.save()

                            event = app

                            Notification.objects.create(user=app.adopter, sender=self.request.user, event=event, 
                                                        text=f"{name} has declined your application")
                            


                return Response(serializer.data)
        else: 
            raise PermissionDenied(detail='Invalid user')
        