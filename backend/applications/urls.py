from django.urls import path
from applications.views import ApplicationListView, ApplicationCreateView, ApplicationListFilterView, ApplicationRetrieveUpdateView

# Make sure endpoints only have nouns to indicate it is stateless (RESTful convention)
app_name = 'application'
urlpatterns = [
    # to redirect/reverse, format is 'namespace:name'
    path('pet/<int:pet_id>/', ApplicationCreateView.as_view(), name='create_application'),
    path('<str:user_type>/list/', ApplicationListView.as_view(), name='list_applications'),
    path('<str:user_type>/list/status/<str:status>/time/<str:type>/', ApplicationListFilterView.as_view(), name='list_filter'),
    path('<str:user_type>/<int:app_id>/', ApplicationRetrieveUpdateView.as_view(), name='view_application'),
]