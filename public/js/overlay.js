//Default icon
var defaultIcon;
var anuEsportIcon;
var qutEsportIcon;
//Custom Fonts
var golcaExtraBold;

//Transitioning
var transitioning = false;
//
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

function drawTopShelf(topShelf) {
  if (JSON.stringify(prevTopShelf) == JSON.stringify(topShelf)) {
    console.log("Waiting...")
    return;
  }
  else {
    prevTopShelf = topShelf;
  }
  //Clear the screen
  clear();
  //Team 1 bar
  push();
  textFont(golcaExtraBold);
  noStroke();
  fill(topShelf.team1PrimaryColour[0],topShelf.team1PrimaryColour[1],topShelf.team1PrimaryColour[2]);
  rect(0, height/15, width/4.5, height/15);
  //Score square
  fill("white")
  rect(width/4.5, height/15, height/15, height/15);
  fill("black");
  textSize(height/13)
  //Score number
  text(topShelf.team1Score, width/4.5+height/100, height/7.9);
  //Team icon    //SHIFT 1 LOGOS WITH THIS 5.4 or 5.5
  image(defaultIcon, width/5.5, height/15, height/15,height/15)
  //Team name
  textSize(height/17)
  fill("white")
 
  text(topShelf.team1,width/5.5-topShelf.team1.length*(height/22.012),height/8.2);
  pop();

  //Team 2 bar
  push();
  textFont(golcaExtraBold);
  noStroke();
  fill(topShelf.team2PrimaryColour[0],topShelf.team2PrimaryColour[1],topShelf.team2PrimaryColour[2]);
  rect(width-width/4.5, height/15, width/4.5, height/15);
  //Score square
  fill("white")
  rect(width-width/4.5-height/15, height/15, height/15, height/15);
  fill("black");
  textSize(height/13)
  //Score number
  text(topShelf.team2Score, width-width/4.5+height/110-height/15, height/7.9);
  //Team icon              //SHIFT 2 LOGOS WITH THIS
  image(defaultIcon, width-width/5.5-height/15, height/15, height/15,height/15)
  //Team name
  textSize(height/16)
  fill("white")
  text(topShelf.team2,width-width/5.5,height/8.2);
  pop();

  //Map counter
  push();
  fill(0, 200);
  rect(width/2-width/10,height/40,width/5,height/20)
  fill("white");
  textSize(height/23)
  text("Map "+topShelf.mapCounter+" - First to "+(floor(topShelf.seriesMaps/2)+1),width/2-width/9.2+width/60,height/40+height/26)
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
  anuEsportIcon = loadImage("images/anuesport2.png");
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
  //Gets topshelf local file
  getData("topShelf.json", (data) => drawTopShelf(data));
  
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

if (typeof module === 'object') {
  module.exports = updateTopShelf;
}