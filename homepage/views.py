from django.shortcuts import render
from .models import *

# Create your views here.

def homepage(request):
    return render(request, 'homepage/base.html')

def simulaiton(request):
    simulaiton = Simulation.objects.get(id = 1)
    context={'simulation': simulaiton}
    return render(request, 'homepage/simulation.html', context)

def game(request):
    game = Game.objects.get(id = 1)
    context = {'game': game}
    return render(request, 'homepage/game.html', context)
