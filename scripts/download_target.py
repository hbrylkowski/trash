import json

import requests

import string

def get_target(trash_id: int):
    data = {
        'id': trash_id,
        'ac': '2',
        'token': 'OkkxhC6b9etJBAq7WTHJ0LhIglO18sip',
    }

    response = requests.post('https://kiedywywoz.pl/API/odpady/', data=data)
    return response.json()

if __name__ == '__main__':
    with open('resources/trash.json', 'r') as f:
        trash = json.load(f)

    with_targets = []

    for trash_id, t in trash.items():
        targets = []
        pulled_targets = get_target(trash_id)
        for _, target in pulled_targets['gids'].items():
            targets.append(
                {"id": target['id'], "name": target["text"]}
            )
        with_targets.append({
            'id': trash_id,
            'name': t['text'],
            'targets': targets,
        })
        with open('resources/targets.json', 'w') as f:
            f.write(json.dumps(with_targets, indent=2))