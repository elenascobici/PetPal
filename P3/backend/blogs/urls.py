from django.urls import path
from . import views

app_name="blogs"
urlpatterns = [
    path('new-blog/', views.BlogCreate.as_view(), name='create-blog')
]