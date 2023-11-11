from django.urls import path

# Make sure endpoints only have nouns to indicate it is stateless (RESTful convention)
app_name = 'application'
urlpatterns = [
    # to redirect/reverse, format is 'namespace:name'
    path('pet/<int:pk>/user/<int:id>/', views, name='details'),
    path('user/<int:pk>/list/', views, name='list'),
    path('user/<int:pk>/list/filtration/', views, name='filtration'),
    path('user/<int:pk/modification/', views, name="modification"),
    path('user/<int:pk>/list/time/<str:type>/', views, name='recent'),
    path('creation/', views, name='creation'),
    path('<int:pk>/<int:user_id>/messages', views, name='messages')
]