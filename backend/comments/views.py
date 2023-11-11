from django.shortcuts import get_object_or_404, render
from rest_framework.generics import ListCreateAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from .models import Review, Reply, Comment
from .serializers import ReviewSerializer, ReplySerializer, CommentDetailSerializer
from ..accounts.models import Shelter


class CommentPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'

class CommentListCreate(ListCreateAPIView):
    serializer_class = ReviewSerializer
    reply_serializer_class = ReplySerializer
    pagination_class = CommentPagination

    def get_queryset(self):
        shelter_id = self.kwargs.get('shelter_id')
        shelter = get_object_or_404(Shelter, pk=shelter_id)
        return Review.objects.filter(commented_shelter_id=shelter).order_by('-time').prefetch_related('replies', 'rating')

    def perform_create(self, serializer):
        serializer.save(commentor_id=self.request.user)

class ReviewCreate(CreateAPIView):
    serializer_class = ReviewSerializer