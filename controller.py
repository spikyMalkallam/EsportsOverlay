import keyboard
import time
import requests

overlayConfig = {
  'config': {
  'game': "CSGO",
  'topShelf': True,
  'playerBars': True,
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
      print("Closed")
      break
    elif keyboard.is_pressed("F17"):
      if (int(overlayConfig["config"]["mapCounterTeam1"])>1):
         continue
      else:
        overlayConfig["config"]["mapCounterTeam1"] = int(overlayConfig["config"]["mapCounterTeam1"]) + 1
      updateConfig()
      time.sleep(0.2)
    elif keyboard.is_pressed("F18"):
      if (int(overlayConfig["config"]["mapCounterTeam1"])<1):
         continue
      else:
        overlayConfig["config"]["mapCounterTeam1"] = int(overlayConfig["config"]["mapCounterTeam1"]) - 1
      updateConfig()
      time.sleep(0.2)
    elif keyboard.is_pressed("F22"):
      if (int(overlayConfig["config"]["mapCounterTeam2"])>1):
         continue
      else:
        overlayConfig["config"]["mapCounterTeam2"] = int(overlayConfig["config"]["mapCounterTeam2"]) + 1
      updateConfig()
      time.sleep(0.2)
    elif keyboard.is_pressed("F23"):
      if (int(overlayConfig["config"]["mapCounterTeam2"])<1):
         continue
      else:
        overlayConfig["config"]["mapCounterTeam2"] = int(overlayConfig["config"]["mapCounterTeam2"]) - 1
      updateConfig()
      time.sleep(0.2)
    elif keyboard.is_pressed("F14"):
      updateConfig()
      time.sleep(0.2)
      