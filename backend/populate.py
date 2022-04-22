import requests
from analytics import models
from django.core.exceptions import ObjectDoesNotExist


season_id = 3
comp_id = 43
base_url = "https://raw.githubusercontent.com/statsbomb/open-data/master/data/"
match_url = base_url + "matches/{}/{}.json"
event_url = base_url + "events/{}.json"
comp_url = base_url + "competitions.json"
lineup_url = base_url + "lineups/{}.json"

def get_match(match_id, comp_id, season_id):

#     competition = requests.get(url=match_url.format(comp_id,season_id)).json()
#     match = requests.get(url=event_url.format(match_id)).json()
    lineup =  requests.get(url=lineup_url.format(match_id)).json()

    return lineup

lineup = get_match(7578, comp_id, season_id)

for team in lineup:
    try:
        current_team = models.Team.objects.get(pk=team['team_id'])
    except ObjectDoesNotExist:
        current_team = models.Team(id=team['team_id'], name=team['team_name'])
        current_team.save()
        
    for player in team['lineup']:
        try:
            current_player = models.Player.objects.get(pk=player['player_id'])
        except ObjectDoesNotExist:
            nickname = player['player_nickname'] or player['player_name']
            current_player = models.Player(id=player['player_id'], name=player['player_name'],
                                          nickname=nickname, team_id=current_team)
            current_player.save()