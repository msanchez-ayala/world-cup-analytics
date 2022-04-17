from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models


class TeamView(viewsets.ModelViewSet):
    serializer_class = serializers.TeamSerializer
    queryset = models.Team.objects.all()


class PlayerView(viewsets.ModelViewSet):
    serializer_class = serializers.PlayerSerializer
    queryset = models.Player.objects.all()