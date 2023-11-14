from .serializers import ApplicationSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView
from django.shortcuts import get_object_or_404
from pets.models.PetDetailModel import PetDetail
from accounts.models.SeekerModel import Seeker
from accounts.models.ShelterModel import Shelter
from applications.models import Application
from rest_framework.response import Response

class ApplicationCreateView(CreateAPIView):
    serializer_class = ApplicationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        return self.perform_create(serializer)

    def perform_create(self, serializer):
        if not self.request.user.is_authenticated:
            print("Auth fails")
            return Response({"detail": "Authentication failed"}, status=401)
        # Check if user is a seeker
        print(self.request.user.user_type)
        if self.request.user.user_type.strip() != 'Seeker':
            print("Your a Seeker")
            return Response({"detail": "Shelters cannot submit applications"}, status=403)

        # ^ What do I want to let the user modify?
        # ^ everything but the status
        print("Lets continue")
        serializer.is_valid()
        user_data = serializer.validated_data 

        # Do not let user modify status aka anything they write will be overriden
        user_data['status'] = 'P'
        # add more data as needed
        # pet = get_object_or_404(Pet, self.kwargs['pet_id'])
        adopter = get_object_or_404(Seeker, id=self.request.user.pk)
        user_data['adopter_id'] = self.request.user.pk

        # Check if pet exists and modify its status:
        pet = get_object_or_404(PetDetail, id=self.kwargs['pet_id'])
        user_data['pet_id'] = self.kwargs['pet_id']

        # Do not let anyone else adopt if set to Unavailable
        print(pet.status)
        if pet.status == 'UNAVAILABLE':
            return Response({"detail": "Pet is not available to adopt"}, status=403)
        elif pet.status == 'ADOPTED':
            return Response({'detail': 'Pet has already been adopted'}, status=403)
        else:
            pet.status = 'UNAVAILABLE'
            pet.save()

        print(pet)
        print(adopter)
        print(pet.status)
        serializer.save()
        return Response(serializer.data, status=201)

class ApplicationListView(ListAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self): 
        if (self.request.user.user_type == 'Seeker'):
            # Check if user is a seeker
            # if not isinstance(self.request.user, Seeker):
            #     return Response({"detail": "Shelters cannot submit applications"}, status=403)
            
            # only return the applications where the adopter_id is the seeker
            return Application.objects.filter(adopter_id=self.request.user.pk)
        
        elif (self.request.user.user_type == 'Shelter'):
            # Check if user is a shelter
            # if not isinstance(self.request.user, Shelter):
            #     return Response({"detail": "Shelters cannot submit applications"}, status=403)
            
            return Application.objects.filter(pet__shelter__id = self.request.user.pk)
        else:
            # return forbidden access response
            return Response({'detail': "Only seekers and shelters can have applications."}, status=403)


class ApplicationListFilterView(ListAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        status = self.kwargs['status']

        if status != 'none':
            #validate status:
            if status == 'pending':
                status_code = 'P'
            elif status == 'accepted':
                status_code = 'Y'
            elif status == 'declined':
                status_code = 'D'
            elif status == 'withdrawn':
                status_code = 'W'
            else:
                #Some error
                return Response({'detail': "Invalid status, no such filter exists."}, status=404)
        

            if (self.request.user.user_type == 'Seeker'):
                # Check if user is a seeker
                # if not isinstance(self.request.user, Seeker):
                #     return Response({"detail": "Shelters cannot submit applications"}, status=403)
                
                # only return the applications where the adopter_id is the seeker
                queryset = Application.objects.filter(adopter_id=self.request.user.pk, status=status_code)
                
            elif (self.request.user.user_type == 'Shelter'):
                # Check if user is a shelter
                # if not isinstance(self.request.user, Shelter):
                #     return Response({"detail": "Shelters cannot submit applications"}, status=403)
                
                queryset = Application.objects.filter(pet__shelter__id = self.request.user.pk, status=status_code)
            else:
                return Response({'detail': "Only seekers and shelters can have applications."}, status=403)
        else:

            if (self.request.user.user_type == 'Seeker'):
            # Check if user is a seeker
                # if not isinstance(self.request.user, Seeker):
                #     return Response({"detail": "Shelters cannot submit applications"}, status=403)
            
                # only return the applications where the adopter_id is the seeker
                queryset = Application.objects.filter(adopter_id=self.request.user.pk)
        
            elif (self.request.user.user_type == 'Shelter'):
                # Check if user is a shelter
                # if not isinstance(self.request.user, Shelter):
                #     return Response({"detail": "Shelters cannot submit applications"}, status=403)
            
                queryset = Application.objects.filter(pet__shelter__id = self.request.user.pk)
            else:
                #return forbidden access response
                return Response({'detail': "Only seekers and shelters can have applications."}, status=404)

        # validate ordering field
        type = self.kwargs['type'] # should only be able to store "creation_time" or "last_update" or "none"
        if type != 'none':
        
            if type == 'creation-time':
                field = 'creation_time'
            elif type == 'last-update':
                field = 'last_update'
            else:
                return Response({'detail': "Invalid field to sort. Please choose between creation-time or last-update."})

            queryset = queryset.order_by(field)
        # else if none then do nothing.
    
        return queryset
    
class ApplicationRetrieveUpdateView(RetrieveUpdateAPIView):
    serializer_class = ApplicationSerializer

    def get_object(self):
        return get_object_or_404(Application, id=self.kwargs['app_id'])
    
    def perform_update(self, serializer):
        application = self.get_object()
        user_data = serializer.validated_data # contains data supplied by the user

        if (self.request.user.user_type == 'Seeker'):
            # Check if user is a seeker
            # if not isinstance(self.request.user, Seeker):
            #     return Response({"detail": "Shelters cannot submit applications"}, status=403)

            if serializer.is_valid():
                # Check that user doesn't try to modify anything else
                for field in user_data:
                    if field != 'status': # cus we want to let them modify the status
                        if application.get(field) != user_data[field]:
                            return Response({'detail': "Cannot modify this field"}, status=403)

                
                if application.status == 'P' or application.status == 'Y' and user_data['status'] == 'W':
                    #serializer = self.get_serializer(application, data=user_data) # serializes data
                    serializer.save()
                    return Response(serializer.data)
            
        elif self.request.user.user_type == 'Shelter':
            # Check if user is a shelter
            # if not isinstance(self.request.user, Shelter):
            #     return Response({"detail": "Shelters cannot submit applications"}, status=403)
            
            if application.status == 'P' and user_data['status'] == 'D':
                #serializer = self.get_serializer(application, data=user_data) # serializes data
                serializer.is_valid()
                serializer.save()
                return Response(serializer.data)
        else: 
            return Response({'detail': "Only seekers and shelters can have applications."}, status=403)
        




# class ApplicationListSortView(ListAPIView):
#     serializer_class = ApplicationSerializer

#     def get_queryset(self):
#         if (self.kwargs['user_type'] == 'seeker'):
#             # Check if user is a seeker
#             if not isinstance(self.request.user, Seeker):
#                 return Response({"detail": "Shelters cannot submit applications"}, status=403)
            
#             # only return the applications where the adopter_id is the seeker
#             queryset = Application.objects.filter(adopter_id=self.request.user.pk)
#         elif (self.kwargs['user_type'] == 'shelter'):
#             # Check if user is a shelter
#             if not isinstance(self.request.user, Shelter):
#                 return Response({"detail": "Shelters cannot submit applications"}, status=403)
            
#             queryset = Application.objects.filter(pet__shelter__id = self.request.user.pk)
#         else:
#             return Response({'detail': "This web page doesn't exist"}, status=404)

#         # validate ordering field
#         type = self.kwargs['type'] # should only be able to store "creation_time" or "last_update"
        
#         if type == 'creation-time':
#             field = 'creation_time'
#         elif type == 'last-update':
#             field = 'last_update'
#         else:
#             return Response({'detail': "Invalid field to sort. Please choose between creation-time or last-update."})

#         queryset = queryset.order_by(field)
#         return queryset