# Generated by Django 4.0.4 on 2022-04-17 18:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('analytics', '0002_rename_player_players_rename_team_teams'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Players',
            new_name='Player',
        ),
        migrations.RenameModel(
            old_name='Teams',
            new_name='Team',
        ),
    ]
