from django.urls import path
from applications.views import ApplicationListView, ApplicationCreateView, ApplicationRetrieveUpdateView

# Make sure endpoints only have nouns to indicate it is stateless (RESTful convention)
app_name = 'application'
urlpatterns = [
    # to redirect/reverse, format is 'namespace:name'
    path('pet/<int:pet_id>/', ApplicationCreateView.as_view(), name='create_application'),
    path('list/', ApplicationListView.as_view(), name='list_applications'),
    path('<int:app_id>/', ApplicationRetrieveUpdateView.as_view(), name='view_application'),
]