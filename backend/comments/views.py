from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework.generics import ListCreateAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.pagination import PageNumberPagination, CursorPagination
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
        # queryset = queryset.prefetch_related('replies', 'rating')
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
            if request.user.user_type == "Shelter":
                return Response({"detail": "Shelters cannot give ratings"}, status=403)
            serializer.save(user=request.user,shelter=shelter)
        elif isinstance(serializer, ReplySerializer):
            if request.user.user_type == "Shelter" and request.user.id != shelter.id:
                return Response({"detail": "Shelters cannot reply on another shelter's comments"}, status=403)
            # comment_id = self.kwargs.get('comment_id')
            comment_id = self.request.query_params.get('comment_id')
            comment = get_object_or_404(Comment, pk=comment_id)

            # Check that this comment being replied to belongs to the shelter
            commented_shelter = comment.get_commented_shelter()
            if commented_shelter == None or commented_shelter.id != shelter_id:
                return Response({"detail": "This comment is not for the specified shelter"}, status=403)
            serializer.save(commenter=request.user, comment=comment)

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
        serializer.is_valid()
        serializer.save(commenter=self.request.user, commented_shelter=shelter)
    
    def create(self, request, *args, **kwargs):
        if self.request.user.user_type == "Shelter":
            return Response({"detail": "Shelters cannot leave reviews"}, status=403)
        return super().create(request, *args, **kwargs)


class MessagePagination(CursorPagination):
    page_size = 10
    ordering = "-creation_time"

    def paginate_queryset(self, queryset, request, view=None):
        self.cursor = request.query_params.get('cursor'), None
        return super().paginate_queryset(queryset, request, view)
    
    def get_paginated_response(self, data):
        next_cursor = None
        if len(data) == self.page_size:
            next_cursor = data[-1]['creation_time']

        return Response({
            'next_cursor': next_cursor,
            'results': data
        })


class MessagePermission(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        application_id = view.kwargs.get('pk')
        application = get_object_or_404(Application, pk=application_id)

        if hasattr(application, 'pet') and hasattr(application.pet, 'shelter') and hasattr(application, 'adopter'):
            shelter = application.pet.shelter
            adopter = application.adopter

            if user.id == adopter.id or user.id == shelter.id:
                return True
            else:
                raise PermissionDenied('Access denied')
        else:
            raise NotFound('Application not found')

        

class MessageListCreate(ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated, MessagePermission]
    pagination_class = MessagePagination

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
        serializer.is_valid()
        serializer.save(sender=self.request.user, application=application)
    