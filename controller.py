topShelf = {
  'team1': "ANU",
  'team2': "QUT",
  'team1PrimaryColour': [0,0,0],
  'team1SecondaryColour': [255,192,203],
  'team2PrimaryColour': [0,0,255],
  'team2SecondaryColour': [230,230,250],
  'team1Score': 2,
  'team2Score': 1,
  'team1Attacking': True,
  'mapCounter': 4,
  'seriesMaps': 5
}

def sendRequest():
    import requests

    url = 'http://localhost:3000/'
    myobj = {'somekey': 'somevalue'}

    x = requests.post(url, json = topShelf)

    print(x.text)

sendRequest()

