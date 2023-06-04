import keyboard
import time
import requests

overlayConfig = {
  'config': {
  'game': "CSGO",
  'topShelf': True
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
      updateConfig()
      time.sleep(0.1)
      continue
    elif keyboard.is_pressed("F14"):
      time.sleep(0.1)
      print("Closed")
      break