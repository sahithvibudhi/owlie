## Backend for Owlie:

### Setup:
STEP 1: `cd backend` make sure you are in backend directory

STEP 2: Install dependencies using:
```
pip install requirements.txt
```

STEP 3: run the backend using 
```
python3 run.py
```

### APIs:

```
POST /user/register
request data: {
    'username': ''
}

response: OK

POST /user/settings
request data: {
    'youtube': 'false',
    'spotify': 'true',
    'netflix': 'true',
    'medium': 'true',
}

response: OK

GET /user/settings
response data: {
    'youtube': 'false',
    'spotify': 'true',
    'netflix': 'true',
    'medium': 'true',
}

GET /friends
{
    friends: [
        {
            name: '',
            last_seen: '',
            location: ''
        }, {
            ...
        }
    ]
}

POST /friends
{
    user_id: ""
}

POST /activity
{
    'app': 'https://netflix.com'
}
```