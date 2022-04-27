from analytics import models
from django.core.exceptions import ObjectDoesNotExist
import statsbomb_requests as sb_requests


def make_team(team: dict) -> models.Team:
    print(f'make_team called with ID {team["team_id"]}')
    try:
        current_team = models.Team.objects.get(pk=team['team_id'])
    except ObjectDoesNotExist:
        current_team = models.Team(id=team['team_id'], name=team['team_name'])
        current_team.save()
        print(f'Saved team {current_team} with ID {current_team.id}')
    return current_team


def make_player(player: dict, team: models.Team) -> models.Player:
    print(f'make_player called with ID {player["player_id"]}')
    try:
        current_player = models.Player.objects.get(pk=player['player_id'])
    except ObjectDoesNotExist:
        nickname = player['player_nickname'] or player['player_name']
        current_player = models.Player(id=player['player_id'],
                                       name=player['player_name'],
                                       nickname=nickname,
                                       team=team)
        current_player.save()
        print(f'Saved player {current_player} with ID {current_player.id}')

    return current_player


def make_match(match: dict,
               home_team: models.Team,
               away_team: models.Team) -> models.Match:
    print(f'make_match called with ID {match["match_id"]}')
    try:
        current_match = models.Match.objects.get(pk=match['match_id'])
    except ObjectDoesNotExist:
        current_match = models.Match(
            id=match['match_id'],
            date=match['match_date'],
            home_team=home_team,
            away_team=away_team,
            home_score=match['home_score'],
            away_score=match['away_score'],
            comp_stage=match['competition_stage']['name'],
            stadium=match['stadium']['name'],
            referee=match['referee']['name']
        )
        current_match.save()
        print(f'Saved match {current_match} with ID {current_match.id}')
    return current_match


def main() -> None:

    print('Attempting to populate the database')

    for match in sb_requests.get_matches():

        for team in sb_requests.get_teams(match['match_id']):
            current_team = make_team(team)
        
            for player in team['lineup']:
                make_player(player, current_team)
        
        home_team = models.Team.objects.get(pk=match['home_team']['home_team_id'])
        away_team = models.Team.objects.get(pk=match['away_team']['away_team_id'])
        
        make_match(match, home_team, away_team)

    print('Database population is complete')

## Since we're invoking with `python manage.py shell < populate.py` we don't
##  need this line
# if __name__ == "__main__":

main()

