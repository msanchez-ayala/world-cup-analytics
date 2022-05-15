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


class MatchView(viewsets.ModelViewSet):
    serializer_class = serializers.MatchSerializer
    queryset = models.Match.objects.all()


class PlayerMatchInfoView(viewsets.ModelViewSet):
    serializer_class = serializers.PlayerMatchInfoSerializer
    queryset = models.PlayerMatchInfo.objects.all()
