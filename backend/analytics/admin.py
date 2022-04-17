from django.contrib import admin
from . import models


class TeamAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')


class PlayerAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'nickname', 'team_id')


admin.site.register(models.Team, TeamAdmin)
admin.site.register(models.Player, PlayerAdmin)
