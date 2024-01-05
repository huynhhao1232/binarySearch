from django.shortcuts import render
from .models import *

# Create your views here.

def homepage(request):
    return render(request, 'homepage/base.html')



