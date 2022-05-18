from rest_framework import serializers
from . import models


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ('id', 'name', 'group')


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Player
        fields = ('id', 'name', 'nickname', 'team', 'jersey_number')


class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Match
        fields = ('id', 'date', 'home_team', 'away_team', 'home_score', 'away_score', 'comp_stage', 'stadium', 'referee')


class PlayerMatchInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlayerMatchInfo
        fields = ('match', 'player', 'position', 'starting_11')
