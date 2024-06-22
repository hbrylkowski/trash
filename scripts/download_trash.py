import json

import requests

import string

def search_trash(phrase: str):
    data = {
        'search': phrase,
        'ac': '1',
        'token': 'OkkxhC6b9etJBAq7WTHJ0LhIglO18sip',
    }

    response = requests.post('https://kiedywywoz.pl/API/odpady/', data=data)
    return response.json()

if __name__ == '__main__':
    all_trash = {}
    for l in string.ascii_lowercase:
        trash = search_trash(l)
        for t in trash['results']:
            all_trash[t['id']] = t

    with open('resources/trash.json', 'w') as f:
        f.write(json.dumps(all_trash, indent=2))