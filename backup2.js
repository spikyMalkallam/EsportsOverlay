//Default icon
var defaultIcon;
var anuEsportIcon;
var qutEsportIcon;
//Custom Fonts
var golcaExtraBold;

//Transitioning
var transitioning = false;
var prevTopShelf;


//Team bars and map counter for series
/*var topShelf = {
  team1: "ANU",
  team2: "QUT",
  team1PrimaryColour: [0,0,0],
  team1SecondaryColour: [255,192,203],
  team2PrimaryColour: [0,0,255],
  team2SecondaryColour: [230,230,250],
  team1Icon: defaultIcon,
  team2Icon: defaultIcon,
  team1Score: 0,
  team2Score: 0,
  team1Attacking: true,
  mapCounter: 1,
  seriesMaps: 4
}*/

function drawOverlay(overlayData) {
  //Check if the overlay data has been updated, update overlay if nescessary
  if (JSON.stringify(prevTopShelf) == JSON.stringify(overlayData)) {
    console.log("Waiting...")
    return;
  }
  else {
    prevTopShelf = overlayData;
  }
  //Clear the screen
  //clear();
  //Testing background
  background("green");
  
  //Centre Rectangle
  push();
  textFont(golcaExtraBold);
  noStroke();
 
  fill(255,255,255,230);
  rect((width/2)-(width/8), height/30, width/4, height/10);

  image(anuEsportIcon, (width/2)-(width/7.9), height/30, height/10,height/10);
  image(qutEsportIcon, (width/2)+(width/14), height/30, height/10,height/10);
  //Team names
  textSize(height/16)
  fill("white")
  text(overlayData.team1,(width/2)-(width/8)-overlayData.team2.length*(height/20),height/9.7);
  text(overlayData.team2,(width/2)+(width/8)+(width/370),height/9.7);
  pop();


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
  //Set icons
  //topShelf.team1Icon = anuEsportIcon;
  //topShelf.team2Icon = qutEsportIcon;
  //ANU Esports font
  golcaExtraBold = loadFont("fonts/golcaExtraBold.ttf");
}

function setup() {
  createCanvas(windowWidth, (windowWidth/16)*9);
  angleMode(DEGREES);
}

function draw() {
  //Gets overlayData local file
  getData("overlayData.json", (data) => drawOverlay(data));
  
  //Keeps the background clear
  
  //background("green")
  
  if (transitioning) {
    wipeTransition();
  }
}

//Keep everything scaled
function windowResized() {
  resizeCanvas(windowWidth, (windowWidth/16)*9);
}

//Helper function I made cause I'm dumb
function scaleBetween(value,lower,upper) {
  return ((upper-lower) * ((value-0)/(width-0)) + lower);
}
