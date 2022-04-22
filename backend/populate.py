
from analytics import models
from django.core.exceptions import ObjectDoesNotExist
import statsbomb_requests as sb_requests

def make_team(team: dict) -> models.Team:

    try:
        current_team = models.Team.objects.get(pk=team['team_id'])
    except ObjectDoesNotExist:
        current_team = models.Team(id=team['team_id'], name=team['team_name'])
        current_team.save()
        print(f'Making team {current_team} with ID {current_team.id}')
    return current_team

def make_player(player: dict, team: models.Team) -> models.Player:

    try:
        current_player = models.Player.objects.get(pk=player['player_id'])
    except ObjectDoesNotExist:
        nickname = player['player_nickname'] or player['player_name']
        current_player = models.Player(id=player['player_id'], name=player['player_name'],
                                        nickname=nickname, team=team)
        print(f'Making player {current_player} with ID {current_player.id}')                           
        current_player.save()

    return current_player

def make_match(match: dict, home_team: models.Team, away_team: models.Team) -> models.Match:
    try:
        print (f"check if match with id {match['match_id']} exists")
        current_match = models.Match.objects.get(pk=match['match_id'])
    except ObjectDoesNotExist:
        print (f"Now making a match with {match['match_id']}")
        current_match = models.Match(
            id=match['match_id'],
            date = match['match_date'],
            home_team = home_team,
            away_team = away_team,
            home_score = match['home_score'],
            away_score = match['away_score'],
            comp_stage = match['competition_stage']['name'],
            stadium = match['stadium']['name'],
            referee = match['referee']['name']
        )
        print ("ive initialised the object")
        current_match.save()
        print(f'Saving match {current_match} with ID {current_match.id}')
    return current_match

def main():

    
    for match in sb_requests.get_matches():

        for team in sb_requests.get_teams(match['match_id']):
            current_team = make_team(team)
        
            for player in team['lineup']:
                make_player(player, current_team)
        
        print ("I've done the old stuff")
        # print (match['match_id'])
        home_team = models.Team.objects.get(pk=match['home_team']['home_team_id'])
        away_team = models.Team.objects.get(pk=match['away_team']['away_team_id'])
        
        make_match(match, home_team, away_team)

# if __name__ == "__main__":

main()

