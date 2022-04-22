from django.db import models


class Team(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()
    # group = models.TextField()

    def __str__(self):
        return self.name


class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()
    nickname = models.TextField()
    team_id = models.ForeignKey(Team, on_delete=models.PROTECT)

    def __str__(self):
        return self.name

# class Manager:


class Match(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.TextField()
    home_team_id = models.ForeignKey(Team, on_delete=models.PROTECT, related_name="home_team_id")
    away_team_id = models.ForeignKey(Team, on_delete=models.PROTECT, related_name="away_team_id")
    home_score = models.IntegerField()
    away_score = models.IntegerField()
    comp_stage = models.TextField()
    stadium = models.TextField()
    referee = models.TextField()

    def __str__(self):
        home_team = Team.objects.get(pk=self.home_team_id)
        away_team = Team.objects.get(pk=self.away_team_id)    
        return f"{home_team.name} V {away_team.name}"




