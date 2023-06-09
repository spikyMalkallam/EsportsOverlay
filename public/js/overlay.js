//Default icon
var defaultIcon;
//Team icons
var anuEsportIcon;
var qutEsportIcon;
//Testing background
var testingBackground
//Bomb icon
var bombIcon;
var bombTimer;
var defuseIcon;
var d;
var seconds;
//Custom Fonts
var golcaExtraBold;

//Transitioning
var transitioning = false;
//Overlay data
var overlayData;
//Overlay config
var overlayConfig
//Armour icons
var armour;
var armourHelmet;



function updateOverlay(data) {
  //Check if the overlay data has been updated, update data if nescessary
  if (JSON.stringify(overlayData) == JSON.stringify(data)) {
    //console.log("Overlay stagnant...")
    return;
  }
  else {
    overlayData = data;
  }
}
function updateConfig(data) {
  //Check if the overlay config has been updated, update config if nescessary
  if (JSON.stringify(overlayConfig) == JSON.stringify(data)) {
    //console.log("Config stagnant...")
    return;
  }
  else {
    overlayConfig = data;
  }
}

function getData(url, cb) {
  fetch(url)
    .then(response => response.json())
    .then(result => cb(result));
}

////////////////////////////////////
/* MAIN SECTION */
////////////////////////////////////
function preload() {
  //Load defualt icon
  defaultIcon = loadImage("images/anu.png");
  anuEsportIcon = loadImage("images/anuesportBlack.png");
  qutEsportIcon = loadImage("images/qutesports.webp")
  testingBackground = loadImage("images/testingBackground.jpg");
  golcaExtraBold = loadFont("fonts/golcaExtraBold.ttf");
  bombIcon = loadImage("images/bombIcon.png");
  defuseIcon = loadImage("images/defuseIcon.png");
  armour = loadImage("images/armour.png");
  armourHelmet = loadImage("images/armourHelmet.png");
  //LOAD DATA BEFORE START
  getData("jsons/overlayData.json", (data) => updateOverlay(data));
  getData("jsons/overlayConfig.json", (data) => updateConfig(data));
}

function setup() {
  createCanvas(1920, 1080);
  angleMode(DEGREES);
  for(i=0;i<10;i++) {
    newPlayer = new Player(i,"Lorem",100,true,false,4,2,16000,[]);
    players.push(newPlayer);
  }
}

function draw() {
  //console.log(frameRate());
  d = new Date();
  seconds = d.getSeconds();
  //Clear the background
  //clear();
  //Testing background
  background(testingBackground);
  //Gets overlayData local file
  getData("jsons/overlayData.json", (data) => updateOverlay(data));
  //Gets overlayConfig local file
  getData("jsons/overlayConfig.json", (data) => updateConfig(data));
  //Draw CSGO overlay is required
  if (overlayConfig.config.game == "CSGO") {
    //Score, team names, time, etc
    if (overlayConfig.config.topShelf) {
      drawCSGOTopShelf(overlayData,overlayConfig);
    }
    if (overlayConfig.config.playerBars) {
      drawPlayerBars(overlayData,overlayConfig);
    }
  }
 
  
  // if (transitioning) {
  //   wipeTransition();
  // }
}

//Keep everything scaled
// function windowResized() {
//   resizeCanvas(windowWidth, (windowWidth/16)*9);
// }

//Helper function I made cause I'm dumb
function scaleBetween(value,rMin,rMax,tMin,tMax) {
  return ((value-rMin)/(rMax-rMin))*(tMax-tMin)+tMin
}
