from django.db import models

# Create your models here.

class Game(models.Model):

    game_hyperlink = models.CharField(max_length=100)

class Simulation(models.Model):
    simulation_hyperlink = models.CharField(max_length=100)
