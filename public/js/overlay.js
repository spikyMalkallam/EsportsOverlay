//Default icon
var defaultIcon;
//Team icons
var anuEsportIcon;
var qutEsportIcon;
//Testing background
var testingBackground
//Custom Fonts
var golcaExtraBold;

//Transitioning
var transitioning = false;
//Overlay data
var overlayData;
//Overlay config
var overlayConfig



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

let wipe1x = 1, wipe2x = 1;
function wipeTransition() {
  push();
  fill("white");
  stroke("white");
  rect(0,0,wipe1x,height);
  pop();
  console.log(wipe1x);
  wipe1x += 2;
  wipe1x += sin(scaleBetween(wipe1x,0,180))*10;

  push();
  fill("black");
  stroke("black");
  rect(-50,0,wipe2x,height);
  pop();
  wipe2x += 2;
  wipe2x += sin(scaleBetween(wipe2x,0,180))*8;

  if(wipe1x >= width) {
    wipe1x = width;
  }
  if(wipe2x >= width+50) {
    wipe2x = width+50;
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
  //LOAD DATA BEFORE START
  getData("jsons/overlayData.json", (data) => updateOverlay(data));
  getData("jsons/overlayConfig.json", (data) => updateConfig(data));
}

function setup() {
  createCanvas(1920, 1080);
  angleMode(DEGREES);
}

function draw() {
  //Clear the background
  //clear();
  //Testing background
  background(testingBackground);
  //Gets overlayData local file
  getData("jsons/overlayData.json", (data) => updateOverlay(data));
  //Gets overlayConfig local file
  getData("jsons/overlayConfig.json", (data) => updateConfig(data));
  //Draws all visual elements
  drawCSGOTopShelf(overlayData);
  
  // if (transitioning) {
  //   wipeTransition();
  // }
}

//Keep everything scaled
// function windowResized() {
//   resizeCanvas(windowWidth, (windowWidth/16)*9);
// }

//Helper function I made cause I'm dumb
function scaleBetween(value,lower,upper) {
  return ((upper-lower) * ((value-0)/(width-0)) + lower);
}
