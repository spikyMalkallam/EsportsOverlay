//Default icon
var defaultIcon;
//Team icons
var team1Logo;
var team2Logo;
//Testing background
var testingBackground
//Bomb icon
var bombIcon;
var bombTimer;
var defuseIcon;
var defusedIcon;
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
//Loadout icons
var fiveSevenIcon = "fiveSeven", akIcon ="ak", augIcon="aug", awpIcon="awp", c4Icon="c4", cz75Icon="cz75", deagleIcon="deagle", decoyIcon="decoy", defuserKitIcon="defuseKit", dualiesIcon="dualies", famasIcon="famas", flashIcon="flash", g3sg1Icon="g3sg1", galilIcon="galil", glockIcon="glock", heIcon="he", incendiaryIcon="incendiary", m4a1sIcon="m4a1s", m4a4Icon="m4a4", m249Icon="m249", mac10Icon="mac10", mag7Icon="mag7", molotovIcon="molotov", mp5Icon="mp5", mp9Icon="mp9", negevIcon="negev", novaIcon="nova", p90Icon="p90", p250Icon="p250", p2000Icon="p2000", ppIcon="pp", r8Icon="r8", sawedoffIcon="sawedoff", scarIcon="scar", scoutIcon="scout", sgIcon="sg", smokeIcon="smoke", tec9Icon="tec9", umpIcon="ump", uspsIcon="usps", xm1014Icon="xm1014", zeusIcon="zeus",mp7Icon="mp7";
var loadoutIcons = [akIcon, augIcon, awpIcon, c4Icon, cz75Icon, deagleIcon, decoyIcon, defuserKitIcon, dualiesIcon, famasIcon, fiveSevenIcon, flashIcon, g3sg1Icon, galilIcon, glockIcon, heIcon, incendiaryIcon, m4a1sIcon, m4a4Icon, m249Icon, mac10Icon, mag7Icon, molotovIcon, mp5Icon, mp9Icon, negevIcon, novaIcon, p90Icon, p250Icon, p2000Icon, ppIcon, r8Icon, sawedoffIcon, scarIcon, scoutIcon, sgIcon, smokeIcon, tec9Icon, umpIcon, uspsIcon, xm1014Icon, zeusIcon,mp7Icon];

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
    this.name = name;
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
  //Loading images
  defaultIcon = loadImage("images/default.png");
  team1Logo = loadImage("images/team1/logo.png");
  team2Logo = loadImage("images/team2/logo.png")
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
  defusedIcon = loadImage("images/bombDefused.png");
  //Load weapon icons
  for (i = 0; i<loadoutIcons.length; i++) {
    loadoutIcons[i] = loadImage("images/weaponIcons/"+loadoutIcons[i]+".png")
  }

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
  clear();
  //Testing background
  //background(testingBackground);
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
  if (overlayData.round.phase == "over") {
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
      playa.loadout = generateLoadout(i)
      allPlayers[i].team == "T" ? team1Players.push(playa) : team2Players.push(playa);
    }
    //team1 = new Team(team1Players,typeof overlayData.map.team_t.name === 'undefined' ? "T" : overlayData.map.team_t.name,overlayData.map.team_t.score);
    //team2 = new Team(team2Players,typeof overlayData.map.team_ct.name === 'undefined' ? "CT" : overlayData.map.team_ct.name,overlayData.map.team_ct.score);
    //FOR LONG MATCH >14, FOR SHORT MATCH >7
    if (swapedSides) {
      team2 = new Team(team1Players,typeof overlayData.map.team_t.name === 'undefined' ? "Team 2" : overlayData.map.team_t.name,overlayData.map.team_t.score,team2Logo);
      team1 = new Team(team2Players,typeof overlayData.map.team_ct.name === 'undefined' ? "Team 1" : overlayData.map.team_ct.name,overlayData.map.team_ct.score,team1Logo);
    }
    else {
      team1 = new Team(team1Players,typeof overlayData.map.team_t.name === 'undefined' ? "Team 1" : overlayData.map.team_t.name,overlayData.map.team_t.score,team1Logo);
      team2 = new Team(team2Players,typeof overlayData.map.team_ct.name === 'undefined' ? "Team 2" : overlayData.map.team_ct.name,overlayData.map.team_ct.score,team2Logo);
    }
    gameState = new Game(team1,team2);
    //console.log(gameState);
}