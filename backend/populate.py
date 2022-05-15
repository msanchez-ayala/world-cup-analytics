from analytics import models
from typing import List
from typing import Tuple
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
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
                                       team=team,
                                       jersey_number=player['jersey_number'])
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


def parse_positions_json(positions: List[dict]) -> Tuple[str, bool]:
    if not positions:
        return None, False
    # TODO: Investigate more
    first_position_json = positions[0] or 'None'
    starting_11 = first_position_json['start_reason'] == 'Starting XI'
    return first_position_json['position'],  starting_11


def make_player_match_info(player_json: dict,
                           match_json: dict) -> models.PlayerMatchInfo:
    print(f'make_player_match_info called with player ID '
          f'{player_json["player_id"]} match ID {match_json["match_id"]}')
    try:
        current_info = models.PlayerMatchInfo.objects.get(
            Q(player_id=player_json['player_id']) &
            Q(match_id=match_json['match_id']))
    except ObjectDoesNotExist:
        position, starting_11 = parse_positions_json(player_json['positions'])
        current_info = models.PlayerMatchInfo(
            player_id=player_json['player_id'],
            match_id=match_json['match_id'],
            position=position,
            starting_11=starting_11
        )
        current_info.save()
        print(f'Saved player match info {current_info}')
    return current_info


def main() -> None:
    # order of objects that need to be created - teams -> players .. matches .. -> playermatchinfo
    print('Attempting to populate the database')

    for match_json in sb_requests.get_matches():

        for team_json in sb_requests.get_teams(match_json['match_id']):
            cur_team_json = make_team(team_json)

        home_team = models.Team.objects.get(pk=match_json['home_team']['home_team_id'])
        away_team = models.Team.objects.get(pk=match_json['away_team']['away_team_id'])
        make_match(match_json, home_team, away_team)
        # the reason this loop is repeated is to create matches before playermatchinfo
        for team_json in sb_requests.get_teams(match_json['match_id']):
            for player_json in team_json['lineup']:
                make_player(player_json, cur_team_json)
                make_player_match_info(player_json, match_json, )



    print('Database population is complete')

## Since we're invoking with `python manage.py shell < populate.py` we don't
##  need this line
# if __name__ == "__main__":

main()

