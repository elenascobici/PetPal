from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from rest_framework.generics import ListCreateAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from .models import Review, Reply, Comment
from .serializers import ReviewSerializer, ReplySerializer, RatingSerializer
from accounts.models.ShelterModel import Shelter


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
        return ReviewSerializer

    def get_queryset(self):
        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id)
        queryset = Review.objects.filter(commented_shelter_id=shelter)
        queryset = queryset.order_by('-time')
        queryset = queryset.select_related('rating', 'commentor_id')
        queryset = queryset.prefetch_related('replies', 'rating')
        return queryset
    
    def get(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
        return super().get(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        # Check if user is authenticated
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication failed"}, status=status.HTTP_401_UNAUTHORIZED)
        
        # Check if shelter exists
        shelter_id = kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # serializer_class = self.get_serializer_class()
        # serializer = serializer_class(data=request.data)
        # serializer.is_valid(raise_exception=True)
        
        if isinstance(serializer, RatingSerializer):
            serializer.save(user=request.user,shelter=shelter)
        elif isinstance(serializer, ReplySerializer):
            review_id = self.kwargs.get('review_id')
            review = get_object_or_404(Review, pk=review_id)
            serializer.save(commentor_id=request.user, comment=review)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    # def perform_create(self, serializer):
    #     serializer.save(commentor_id=self.request.user)

class ReviewCreate(CreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id)
        serializer.save(commentor_id=self.request.user, shelter=shelter)

    

    