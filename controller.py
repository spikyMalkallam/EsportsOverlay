import keyboard
import time
import requests

overlayConfig = {
  'config': {
  'game': "CSGO",
  'topShelf': True,
  'mapCounterTeam1': 0,
  'mapCounterTeam2': 0
  }
}

def updateConfig():
    url = 'http://localhost:3000/'

    x = requests.post(url, json = overlayConfig)

    print(x.text)

def checkConnection():
    try:
      requests.get('http://localhost:3000/')
    except:
        print("---CONNECTION FAILED---")

while (True):
    if keyboard.is_pressed("F13"):
      time.sleep(0.1)
      print("Closed")
      break
    elif keyboard.is_pressed("F17"):
      time.sleep(0.1)
      if (int(overlayConfig["config"]["mapCounterTeam1"])>1):
         continue
      else:
        overlayConfig["config"]["mapCounterTeam1"] = int(overlayConfig["config"]["mapCounterTeam1"]) + 1
      updateConfig()
    elif keyboard.is_pressed("F18"):
      time.sleep(0.1)
      if (int(overlayConfig["config"]["mapCounterTeam1"])<1):
         continue
      else:
        overlayConfig["config"]["mapCounterTeam1"] = int(overlayConfig["config"]["mapCounterTeam1"]) - 1
      updateConfig()
      