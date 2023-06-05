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

    //Round Counter
    textSize(height/30);
    textAlign(CENTER);
    //FOR LONG MATCH "/30" FOR SHORT MATCH "/16"
    text("Round "+(parseInt(overlayInfo.map.round)+1) +"/16", width/2, height/16)

    //Round wins
    textSize(height/14);
    text(overlayInfo.map.team_t.score, (width/2)-(width/13), height/11)
    text(overlayInfo.map.team_ct.score , (width/2)+(width/13), height/11)
    //Map counter
    push();
    stroke("black");
    strokeWeight(5)
    if (overlayConfig.config.mapCounterTeam1 == 1) {
        fill("black");
        rect(width/2.48,height/9.5, height/30,height/55);
    }
    if (overlayConfig.config.mapCounterTeam1 == 2) {
        fill("black");
        rect(width/2.34,height/9.5, height/30,height/55);
    }
    else {
        noFill()
    }
    rect(width/2.48,height/9.5, height/30,height/55);
    rect(width/2.34,height/9.5, height/30,height/55);
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