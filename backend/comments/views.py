from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework.generics import ListCreateAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework import status
from .models import Review, Reply, Comment, Message
from .serializers import CommentSerializer, ReviewSerializer, ReplySerializer, RatingSerializer, MessageSerializer
from accounts.models.ShelterModel import Shelter
from accounts.models.SeekerModel import Seeker
from applications.models import Application


class CommentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class CommentListCreate(ListCreateAPIView):
    pagination_class = CommentPagination
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            if 'value' in self.request.data:
                return RatingSerializer
            elif 'text' in self.request.data:
                return ReplySerializer
        return CommentSerializer

    def get_queryset(self):
        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id)
        queryset = Review.objects.filter(commented_shelter_id=shelter)
        queryset = queryset.order_by('-time')
        queryset = queryset.select_related('rating', 'commenter')
        queryset = queryset.prefetch_related('replies', 'rating')
        return queryset
    
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication failed"}, status=401)
        return super().get(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication failed"}, status=401)
        
        # Check if shelter exists
        shelter_id = kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Check whether the post is a rating or reply
        # If the commenter is a shelter, make sure it's the shelter being commented on      
        if isinstance(serializer, RatingSerializer):
            if isinstance(request.user, Shelter):
                return Response({"detail": "Shelters cannot give ratings"}, status=403)
            serializer.save(user=request.user,shelter=shelter)
        elif isinstance(serializer, ReplySerializer):
            if isinstance(request.user, Shelter) and request.user != shelter:
                return Response({"detail": "Shelters cannot reply on another shelter's comments"}, status=403)
            review_id = self.kwargs.get('review_id')
            review = get_object_or_404(Review, pk=review_id)
            serializer.save(commenter=request.user, comment=review)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def perform_create(self, serializer):
    #     serializer.save(commenter=self.request.user)

class ReviewCreate(CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id)
        if isinstance(self.request.user, Shelter):
            return Response({"detail": "Shelters cannot leave reviews"}, status=403)

        serializer.save(commenter=self.request.user, shelter=shelter)

class MessagePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user

        if hasattr(obj, 'application'):
            application = obj.application

            if hasattr(application, 'pet') and hasattr(application.pet, 'shelter') and hasattr(application, 'adopter'):
                shelter = application.pet.shelter
                adopter = application.adopter

                if user == adopter or user == shelter:
                    return True
                else:
                    raise PermissionDenied('Access denied')
            else:
                raise NotFound('Application not found')
        else:
            raise NotFound('Application not found')
        

class MessageListCreate(ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated, MessagePermission]

    def get_queryset(self):
        application_id = self.kwargs.get('pk')
        application = get_object_or_404(Application, pk=application_id)
        return Message.objects.filter(application=application).order_by('-creation_time')
    
    def perform_create(self, serializer):
        application_id = self.kwargs.get('pk')
        application = get_object_or_404(Application, pk=application_id)
        # Update the application's last_update time whenever a message is created
        try:
            application.last_update = serializer.validated_data['creation_time']
            application.save()
        except KeyError:
            pass
        serializer.save(sender=self.request.user, application=application)
    