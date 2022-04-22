from django.contrib import admin
from . import models


class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'nickname', 'team_id')

class MatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'home_team_id', 'away_team_id', 'home_score', 'away_score', 'comp_stage', 'stadium', 'referee')


admin.site.register(models.Team, TeamAdmin)
admin.site.register(models.Player, PlayerAdmin)
admin.site.register(models.Match, MatchAdmin)