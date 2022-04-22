import requests

base_url = "https://raw.githubusercontent.com/statsbomb/open-data/master/data/"
match_url = base_url + "matches/{}/{}.json"
event_url = base_url + "events/{}.json"
lineup_url = base_url + "lineups/{}.json"

# default values give world cup 2018
def get_matches(season_id: int = 3, comp_id: int = 43) -> list:

    return requests.get(url=match_url.format(comp_id,season_id)).json()

def get_teams(match_id: int) -> list:

    return requests.get(url=lineup_url.format(match_id)).json()

def get_events(match_id: int) -> list:

    return requests.get(url=event_url.format(match_id)).json()