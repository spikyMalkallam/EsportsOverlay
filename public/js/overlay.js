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
var exploded;
//Custom Fonts
var golcaExtraBold;

var d;

//Transitioning
var transitioning = false;
//Overlay data
var overlayData;
//Overlay config
var overlayConfig
//Armour icons
var armour;
var armourHelmet;
//Player stats icons
var kills;
var deaths;
var dead;
//Game info
var gameState;
var swapedSides;

class Game {
  constructor(team1,team2) {
    this.team1 = team1;
    this.team2 = team2;
  }
}

class Team {
  constructor(players,name,score) {
    //Array of players
    this.players = players;
    this.score = score;
    this.name = name
  }
}

class Player {
  constructor(name, health, armour, helmet, kills, deaths, money, loadout) {
      this.name = name;
      this.health = health;
      this.armour = armour;
      this.helmet = helmet;
      this.kills = kills;
      this.deaths = deaths;
      this.money = money;
      this.loadout = loadout;
  }
}
var players = [];


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
  kills = loadImage("images/kills.png");
  deaths = loadImage("images/deaths.png");
  dead = loadImage("images/dead.png");
  exploded = loadImage("images/exploded.png");
  //LOAD DATA BEFORE START
  getData("jsons/overlayData.json", (data) => updateOverlay(data));
  getData("jsons/overlayConfig.json", (data) => updateConfig(data));
}

function setup() {
  createCanvas(1920, 1080);
  angleMode(DEGREES);
  swapedSides = false;
}

function draw() {
  // console.log(parseInt("100")>0)
  //console.log(frameRate()); 
  d = new Date();
  seconds = (d.getHours()*3600)+(d.getMinutes()*60)+d.getSeconds();
  //Clear the background
  //clear();
  //Testing background
  background(testingBackground);
  //Gets overlayData local file
  getData("jsons/overlayData.json", (data) => updateOverlay(data));
  //Gets overlayConfig local file
  getData("jsons/overlayConfig.json", (data) => updateConfig(data));
  if (!overlayConfig.config.gameStateLock) {
    updateGameState();
    //console.log(gameState);
  }
  else {
    //updateGameState();
  }
  if (overlayData.round.phase == "over" || true) {
    roundWinBanner();
  }
  else {
    resetWinBanner();
  }

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

function updateGameState() {
    if ((overlayData.map.round>7)) {
      swapedSides = true;
    }
    else {
      swapedSides = false;
    }
    allPlayers = Object.values(overlayData.allplayers);
    team1Players = [];
    team2Players = [];
    for(i = 0; i<allPlayers.length; i++) {
      playa = new Player(allPlayers[i].name,allPlayers[i].state.health,(parseInt(allPlayers[i].state.armor)>0),allPlayers[i].state.helmet,allPlayers[i].match_stats.kills,allPlayers[i].match_stats.deaths,allPlayers[i].state.money,[]);
      allPlayers[i].team == "T" ? team1Players.push(playa) : team2Players.push(playa);
    }
    //team1 = new Team(team1Players,typeof overlayData.map.team_t.name === 'undefined' ? "T" : overlayData.map.team_t.name,overlayData.map.team_t.score);
    //team2 = new Team(team2Players,typeof overlayData.map.team_ct.name === 'undefined' ? "CT" : overlayData.map.team_ct.name,overlayData.map.team_ct.score);
    //FOR LONG MATCH >14, FOR SHORT MATCH >7
    if (swapedSides) {
      team2 = new Team(team1Players,typeof overlayData.map.team_t.name === 'undefined' ? "Team 2" : overlayData.map.team_t.name,overlayData.map.team_t.score);
      team1 = new Team(team2Players,typeof overlayData.map.team_ct.name === 'undefined' ? "Team 1" : overlayData.map.team_ct.name,overlayData.map.team_ct.score);
    }
    else {
      team1 = new Team(team1Players,typeof overlayData.map.team_t.name === 'undefined' ? "Team 1" : overlayData.map.team_t.name,overlayData.map.team_t.score);
      team2 = new Team(team2Players,typeof overlayData.map.team_ct.name === 'undefined' ? "Team 2" : overlayData.map.team_ct.name,overlayData.map.team_ct.score);
    }
    gameState = new Game(team1,team2);
    //console.log(gameState);
}