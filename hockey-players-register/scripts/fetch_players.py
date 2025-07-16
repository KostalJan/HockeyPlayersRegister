import requests
import json

standings_url = "https://api-web.nhle.com/v1/standings/now"
response = requests.get(standings_url)
data = response.json()


team_abbrevs = []

#Načtení všech zkratek týmů
for record in data["standings"]:
    team_abbrevs.append(record["teamAbbrev"]['default'])




all_players = []

#Načtení informací o všech hráčích pomocí procházení soupisek každého týmu
for abbrev in team_abbrevs:
    roster_url = f"https://api-web.nhle.com/v1/roster/{abbrev.lower()}/current"
    response = requests.get(roster_url)
    roster_data = response.json()
    
    for player in roster_data["forwards"] + roster_data["defensemen"] + roster_data["goalies"]:
        all_players.append({
            "id": player["id"],
            'headshot': player['headshot'],
            "firstName": player["firstName"]['default'],
            "lastName": player["lastName"]['default'],
            "position": player.get("positionCode", 'unknown'),
            "team": abbrev,
            "country": player['birthCountry']
        })

#Uložení dat o hráčích do souboru players.json       
with open("../server/players.json", "w", encoding="utf-8") as f:
    json.dump(all_players, f, ensure_ascii=False, indent=2)