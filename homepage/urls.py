from django.urls import path
from django.conf import settings
from . import views
app_name = 'homepage'
urlpatterns = [
    path('',views.homepage,name = "Homepage"),
    path('simulaiton/', views.simulaiton, name="simulation"),
    path('game/', views.game, name="game")
]

