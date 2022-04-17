from django.db import models


class Team(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()

    def __str__(self):
        return self.name


class Player(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.TextField()
    nickname = models.TextField()
    team_id = models.ForeignKey(Team, on_delete=models.PROTECT)

    def __str__(self):
        return self.name


