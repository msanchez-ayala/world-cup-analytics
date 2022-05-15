from django.contrib import admin
from . import models


class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'nickname', 'team', 'jersey_number')


class MatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'home_team', 'away_team', 'home_score', 'away_score', 'comp_stage', 'stadium', 'referee')


class PlayerMatchInfoAdmin(admin.ModelAdmin):
    list_display = ('match', 'player', 'position', 'starting_11')


admin.site.register(models.Team, TeamAdmin)
admin.site.register(models.Player, PlayerAdmin)
admin.site.register(models.Match, MatchAdmin)
admin.site.register(models.PlayerMatchInfo, PlayerMatchInfoAdmin)