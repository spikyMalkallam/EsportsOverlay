class Player {
    constructor(index, name, health, armour, helmet, kills, deaths, money, loadout) {
        this.index = index;
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

function drawCSGOTopShelf(overlayInfo,overlayConfig) {
    //T team name
    tTeamName = "T"
    //CT team name
    ctTeamName = "CT"
    //Centre Rectangle
    push();
    textFont(golcaExtraBold);
    noStroke();
    fill(255,255,255,230);
    rect((width/2)-(width/7), height/30, width/3.5, height/10);
    //Icons
    image(anuEsportIcon, (width/2)-(width/6.7), height/30, height/10,height/10);
    image(qutEsportIcon, (width/2)+(width/11), height/30, height/10,height/10);
    //Team names
    textSize(height/16);
    fill("white");
    //Check overlayData
    if (typeof overlayInfo.map === 'undefined') {
        return;
    }
    if (!(typeof overlayInfo.map.team_t.name === 'undefined')) {
        tTeamName = overlayInfo.map.team_t.name;
    }
    if (!(typeof overlayInfo.map.team_ct.name === 'undefined')) {
        ctTeamName = overlayInfo.map.team_ct.name;
    }
    textAlign(RIGHT);
    text(tTeamName,(width/2)-(width/6.8),height/9.7);
    textAlign(LEFT);
    text(ctTeamName,(width/2)+(width/6.8),height/9.7);

    //Round Time
    fill("black")
    if (overlayInfo.phase_countdowns.phase == "live") {
        textAlign(CENTER);
        textSize(height/18);
        text(roundSecondsToMinutes(overlayInfo.phase_countdowns.phase_ends_in.slice(0,-2)), width/2, height/8.5)
    }
    else if (overlayInfo.phase_countdowns.phase == "defuse" || overlayInfo.phase_countdowns.phase == "bomb") {
        //console.log(seconds);
        //console.log(bombTimer);
        if (overlayInfo.phase_countdowns.phase_ends_in >= 39.7) {
            bombTimer = seconds;
        }
        push();
        imageMode(CENTER);
        image(bombIcon, width/2, height/10,bombIcon.width-(height/100),bombIcon.height-(height/100));
        rectMode(CENTER);
        fill("red");
        rect((width/2),height/7,scaleBetween(seconds-bombTimer,40,0,0,width/3.5),height/100)
        pop();
        if (overlayInfo.phase_countdowns.phase == "defuse") {
            push();
            rectMode(CENTER);
            imageMode(CENTER);
            fill("blue");
            rect((width/2),height/6,scaleBetween(overlayInfo.phase_countdowns.phase_ends_in,0,10,0,width/3.5),height/100);
            image(defuseIcon,width/2, height/5)
            pop();
        }
    }

    //Round Counter
    textSize(height/30);
    textAlign(CENTER);
    //FOR LONG MATCH "/30" FOR SHORT MATCH "/16"
    text("Round "+(parseInt(overlayInfo.map.round)+1) +"/16", width/2, height/16)

    //Round wins
    textSize(height/14);
    text(overlayInfo.map.team_t.score, (width/2)-(width/13), height/11)
    text(overlayInfo.map.team_ct.score , (width/2)+(width/13), height/11)
    //Map counters
    push();
    stroke("black");
    strokeWeight(5)
    //Team 1
    if (overlayConfig.config.mapCounterTeam1 == 1) {
        fill("black");
        rect(width/2.47,height/9.5, height/30,height/55);
    }
    if (overlayConfig.config.mapCounterTeam1 == 2) {
        fill("black");
        rect(width/2.33,height/9.5, height/30,height/55);
    }
    else {
        noFill()
    }
    rect(width/2.47,height/9.5, height/30,height/55);
    rect(width/2.33,height/9.5, height/30,height/55);
    pop();

    push();
    stroke("black");
    strokeWeight(5)
    //Team 2
    if (overlayConfig.config.mapCounterTeam2 == 1) {
        fill("black");
        rect(width/1.80,height/9.5, height/30,height/55);
    }
    if (overlayConfig.config.mapCounterTeam2 == 2) {
        fill("black");
        rect(width/1.725,height/9.5, height/30,height/55);
    }
    else {
        noFill()
    }
    rect(width/1.80,height/9.5, height/30,height/55);
    rect(width/1.725,height/9.5, height/30,height/55);
    pop();

    pop();
  }
  

  //Turns seconds left into minutes and seconds
  function roundSecondsToMinutes(seconds) {
    minutes = Math.floor(parseInt(seconds)/60);
    secs = parseInt(seconds)%60;
    additionalZero = "";
    if (secs < 10) {
        additionalZero = "0"
    }
    return minutes + ":" + additionalZero + secs;
  }

  function drawPlayerBars(overlayInfo,overlayConfig) {
    push();
    noStroke();
    textAlign(CENTER);
    imageMode(CENTER);
    textFont(golcaExtraBold);
    for (i=0;i<players.length;i++) {
        if (i<5) {
            push();
            rect((width/192)+((i*width/12)+(i*5)),height/1.07,width/12,height/20,height/60);
            fill(237, 159, 0,180);
            rect((width/192)+((i*width/12)+(i*5)),height/1.22,width/12,height/9,height/60);
            pop();
            drawPlayerInfo(false);
        }
        else {
            push();
            rect(((width/2)+(width/12)-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.07,width/12,height/20,height/60);
            fill(1, 113, 213,180);
            rect(((width/2)+(width/12)-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.22,width/12,height/9,height/60);
            pop();
            drawPlayerInfo(true);
        }
        }   
    //line(width/2,0,width/2,height);
    //width/192 + i*width/12
    pop();
  }
  
  function drawPlayerInfo(right) {
    fill("white");
    //LEFT SIDE
    if (!right) {
    //Drawing name
    textSize(25);
    text(players[i].name,(width/192)+width/24+((i*width/12)+(i*5)),height/1.14);
    textSize(40);
    //Drawing health
    if (!players[i].armour && !players[i].helmet) {
        text(players[i].health,(width/192)+width/24+((i*width/12)+(i*5)),height/1.1735);
    }
    else {
        text(players[i].health,width/24+((i*width/12)+(i*5)-(width/170)),height/1.1735);
    }
    //Drawing armour icon
    if (players[i].armour && !players[i].helmet) {
        image(armour,(width/42)+width/24 +((i*width/12)+(i*5)),height/1.189,armour.width/5,armour.height/5);
    }
    if (players[i].armour && players[i].helmet) {
        image(armourHelmet,(width/42)+width/24 +((i*width/12)+(i*5)),height/1.189,armourHelmet.width/5,armourHelmet.height/5);
    }
    }
    //RIGHT SIDE
    else {
    //Drawing name
    textSize(25);
    text(players[i].name,((width/2)+(width/8.2)-(width/58))+(((i-5)*width/12)+((i-5)*5)),height/1.14);
    textSize(40);
    //Drawing health
    if (!players[i].armour && !players[i].helmet) {
        text(players[i].health,((width/2)+(width/9)-(width/58))+(((i-5)*width/12)+((i-5)*5)),height/1.1735);
    }
    else {
        text(players[i].health,((width/2)+(width/9)-(width/58))+(((i-5)*width/12)+((i-5)*5)),height/1.1735);
    }
    //Drawing armour icon
    if (players[i].armour && !players[i].helmet) {
        image(armour,((width/2)+(width/7)-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.189,armour.width/5,armour.height/5);
    }
    if (players[i].armour && players[i].helmet) {
        image(armourHelmet,((width/2)+(width/7)-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.189,armourHelmet.width/5,armourHelmet.height/5);
    }
    }
}



