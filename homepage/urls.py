from django.urls import path
from django.conf import settings
from . import views
app_name = 'homepage'
urlpatterns = [
    path('',views.homepage,name = "Homepage"),

]

