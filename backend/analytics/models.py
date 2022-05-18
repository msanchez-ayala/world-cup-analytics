from django.db import models


class Team(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()
    group = models.TextField()

    def __str__(self):
        return self.name


class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()
    nickname = models.TextField()
    team = models.ForeignKey(Team, on_delete=models.PROTECT)
    jersey_number = models.IntegerField()

    def __str__(self):
        return self.name

# class Manager:


class Match(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.TextField()
    home_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name="home_team_id")
    away_team = models.ForeignKey(Team, on_delete=models.PROTECT, related_name="away_team_id")
    home_score = models.IntegerField()
    away_score = models.IntegerField()
    comp_stage = models.TextField()
    stadium = models.TextField()
    referee = models.TextField()


    def __str__(self):
    
        return f"{self.home_team.name} V {self.away_team.name}"


class PlayerMatchInfo(models.Model):
    match = models.ForeignKey(Match, on_delete=models.PROTECT, related_name="match_id")
    player = models.ForeignKey(Player, on_delete=models.PROTECT, related_name="player_id")
    position = models.TextField(null=True, blank=True)  # First one only
    starting_11 = models.BooleanField()

    def __str__(self):
        return f"Match {self.match.id}: player {self.player.name}"











