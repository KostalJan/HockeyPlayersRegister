import json


with open('../server/players.json', 'r', encoding='utf-8') as file:
    data = json.load(file)
    
print(f'Počet hráčů: {len(data)}')