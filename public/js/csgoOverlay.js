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
    image(team1Logo, (width/2)-(width/7), height/30, height/10,height/10);
    image(team2Logo, (width/2)+(width/11.5), height/30, height/10,height/10);
    // image(defaultIcon, (width/2)-(width/7), height/30, height/10,height/10);
    // image(defaultIcon, (width/2)+(width/11.5), height/30, height/10,height/10);
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
    text(gameState.team1.name,(width/2)-(width/6.8),height/9.7);
    textAlign(LEFT);
    text(gameState.team2.name,(width/2)+(width/6.8),height/9.7);

    //Round Time
    fill("black")
    if (overlayInfo.phase_countdowns.phase == "live" || overlayInfo.phase_countdowns.phase == "freezetime") {
        textAlign(CENTER);
        textSize(height/18);
        text(roundSecondsToMinutes(overlayInfo.phase_countdowns.phase_ends_in.slice(0,-2)), width/2, height/8.5)
    }
    else if (overlayInfo.phase_countdowns.phase == "defuse" || overlayInfo.phase_countdowns.phase == "bomb") {
        //console.log("Seconds: "+seconds);
        //console.log("Timer: "+bombTimer);
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
    else if (overlayInfo.round.bomb == "exploded") {
        imageMode(CENTER);
        image(exploded,width/2, height/10.2,exploded.width/3.5,exploded.height/3.5);
    }
    else if (overlayInfo.round.bomb == "defused") {
        imageMode(CENTER);
        image(defusedIcon,width/2, height/10.2,exploded.width/3.5,exploded.height/3.5);
        //image(defuseIcon,width/2, height/10.2,exploded.width/3.5,exploded.height/3.5);
    }

    //Round Counter
    textSize(height/34);
    textAlign(CENTER);
    //FOR LONG MATCH "/30" FOR SHORT MATCH "/16"
    text("Round "+(parseInt(overlayInfo.map.round)+1) +"/16", width/2, height/16)

    //Round wins
    textSize(height/16);
    text(gameState.team1.score, (width/2)-(width/15.6), height/9.9)
    text(gameState.team2.score, (width/2)+(width/15.4), height/9.9)
    //Map counters
    push();
    stroke("black");
    strokeWeight(5)
    //Team 1
    if (overlayConfig.config.mapCounterTeam1 == 1) {
        fill("black");
        rect(width/2.38,height/9, height/40,height/65);
    }
    if (overlayConfig.config.mapCounterTeam1 == 2) {
        fill("black");
        rect(width/2.28,height/9, height/40,height/65);
    }
    else {
        noFill()
    }
    rect(width/2.38,height/9, height/40,height/65);
    rect(width/2.28,height/9, height/40,height/65);
    pop();

    push();
    stroke("black");
    strokeWeight(5)
    //Team 2
    if (overlayConfig.config.mapCounterTeam2 == 1) {
        fill("black");
        rect(width/1.82,height/9, height/40,height/65);
    }
    if (overlayConfig.config.mapCounterTeam2 == 2) {
        fill("black");
        rect(width/1.76,height/9, height/40,height/65);
    }
    else {
        noFill()
    }
    rect(width/1.82,height/9, height/40,height/65);
    rect(width/1.76,height/9, height/40,height/65);
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

  function drawPlayerBars() {
    push();
    noStroke();
    textAlign(CENTER);
    imageMode(CENTER);
    textFont(golcaExtraBold);
    for (i=0;i<gameState.team1.players.length+gameState.team2.players.length;i++) {
        if (i<5) {
            push();
            rect((width/192)+((i*width/12)+(i*5)),height/1.06,width/12,height/20,height/60);
            //FOR LONG MATCH >14, FOR SHORT MATCH >7
            if (overlayData.player.name == gameState.team1.players[i].name) {
                push();
                strokeWeight(6);
                stroke(255,255,255,255);
                noFill();
                rect((width/192)+((i*width/12)+(i*5)),height/1.24,width/12,height/8,height/60);
                pop();
            }
            overlayData.map.round>7 ? fill(((100-gameState.team1.players[i].health)*2)+1, 113-(100-gameState.team1.players[i].health), 213-(100-gameState.team1.players[i].health)*2,150) : fill(237, 159-(100-gameState.team1.players[i].health), 0,150);
            gameState.team1.players[i].health==0 ? fill(121,121,121,150) : null;
            rect((width/192)+((i*width/12)+(i*5)),height/1.24,width/12,height/8,height/60);
            // fill(255,0,0,gameState.team1.players[i].health==0 ? 0 : 100-gameState.team1.players[i].health);
            // rect((width/192)+((i*width/12)+(i*5)),height/1.24,width/12,height/8,height/60);
            pop();
            drawPlayerInfo(false);
        }
        else {
            push();
            rect((((width/2)+(width/12)+(width/192))-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.06,width/12,height/20,height/60);
            if (overlayData.player.name == gameState.team2.players[i-5].name) {
                push();
                strokeWeight(6);
                stroke(255,255,255,255);
                noFill();
                rect((((width/2)+(width/12)+(width/192))-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.24,width/12,height/8,height/60);
                pop();
            }
            overlayData.map.round>7 ? fill(237, 159-(100-gameState.team2.players[i-5].health), 0,150) : fill(((100-gameState.team2.players[i-5].health)*2)+1, 113-(100-gameState.team2.players[i-5].health), 213-(100-gameState.team2.players[i-5].health)*2,150);
            gameState.team2.players[i-5].health==0 ? fill(121,121,121,150) : null;
            rect((((width/2)+(width/12)+(width/192))-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.24,width/12,height/8,height/60);
            // fill(255,0,0,gameState.team2.players[i-5].health==0 ? 0 : 100-gameState.team2.players[i-5].health);
            // rect(((width/2)+(width/12)-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.24,width/12,height/8,height/60);
            pop();
            drawPlayerInfo(true);
        }
        }   
    //line(width/2,0,width/2,height);
    //width/192 + i*width/12
    pop();
  }
  

  var nameFontSize = 23
  function drawPlayerInfo(right) {
    fill("white");
    //LEFT SIDE 
    if (!right) {
    //Drawing name
    textSize(nameFontSize-((gameState.team1.players[i].name.length > 11) ? gameState.team1.players[i].name.length-11 : 0));
    text(gameState.team1.players[i].name,(width/192)+width/24+((i*width/12)+(i*5)),height/1.164);
    //Drawing kills and deaths
    textSize(30);
    image(kills,(width/192)+width/70+((i*width/12)+(i*5)),height/1.137,kills.width/1.3,kills.height/1.3);
    text(gameState.team1.players[i].kills,(width/192)+width/35+((i*width/12)+(i*5)),height/1.125);
    image(deaths,(width/192)+width/19+((i*width/12)+(i*5)),height/1.137,deaths.width/1.3,deaths.height/1.3);
    text(gameState.team1.players[i].deaths,(width/192)+width/15+((i*width/12)+(i*5)),height/1.125);

    //Drawing money
    push();
    fill(0, 207, 4);
    text("$"+gameState.team1.players[i].money,(width/192)+width/24+((i*width/12)+(i*5)),height/1.086);
    pop();

    textSize(40);
    imageMode(CENTER);
    //Drawing health
    if (!gameState.team1.players[i].armour && !gameState.team1.players[i].helmet) {
        if (gameState.team1.players[i].health == 0) {
            image(dead,(width/192)+width/24+((i*width/12)+(i*5)),height/1.21,dead.width*1.25,dead.height*1.25);
        }
        else {
            text(gameState.team1.players[i].health,(width/192)+width/24+((i*width/12)+(i*5)),height/1.1935);
        }  
    }
    else {
        text(gameState.team1.players[i].health,width/24+((i*width/12)+(i*5)-(width/170)),height/1.1935);
    }
    //Drawing armour icon
    if (gameState.team1.players[i].armour && !gameState.team1.players[i].helmet) {
        image(armour,(width/42)+width/24 +((i*width/12)+(i*5)),height/1.21,armour.width/6.2,armour.height/6.2);
    }
    if (gameState.team1.players[i].armour && gameState.team1.players[i].helmet) {
        image(armourHelmet,(width/42)+width/24 +((i*width/12)+(i*5)),height/1.21,armourHelmet.width/6.2,armourHelmet.height/6.2);
    }

    //Drawing loadout
    push();
    loadoutWidth = 0;
    imageMode(CORNER);
    for (k=0;k<gameState.team1.players[i].loadout.length;k++) {
        x = gameState.team1.players[i].loadout[k].height/(height/60);
        yyyyy = gameState.team1.players[i].loadout[k].width/x;
        image(gameState.team1.players[i].loadout[k],(width/160) +((i*width/12)+(i*5))+(loadoutWidth),height/1.043,yyyyy,height/60);
        loadoutWidth += yyyyy+3;
    }
    
    pop();

    }
    //RIGHT SIDE
    else {
    //Drawing name
    textSize(nameFontSize-((gameState.team2.players[i-5].name.length > 11) ? gameState.team2.players[i-5].name.length-11 : 0));
    
    text(gameState.team2.players[i-5].name,(((width/2)+(width/8.2)+(width/192))-(width/58))+(((i-5)*width/12)+((i-5)*5)),height/1.164);
    //Drawing kills and deaths
    textSize(30);
    image(kills,(((width/2)+(width/7)+(width/192))-(width/15))+(((i-5)*width/12)+((i-5)*5)),height/1.137,kills.width/1.3,kills.height/1.3);
    text(gameState.team2.players[i-5].kills,(((width/2)+(width/7)+(width/192))-(width/19))+(((i-5)*width/12)+((i-5)*5)),height/1.125);
    image(deaths,(((width/2)+(width/7)+(width/192))-(width/37))+(((i-5)*width/12)+((i-5)*5)),height/1.137,deaths.width/1.3,deaths.height/1.3);
    text(gameState.team2.players[i-5].deaths,(((width/2)+(width/7)+(width/192))-(width/83))+(((i-5)*width/12)+((i-5)*5)),height/1.125);
    
    //Drawing money
    push();
    fill(0, 207, 4);
    text("$"+gameState.team2.players[i-5].money,(((width/2)+(width/8.2)+(width/192))-(width/58))+(((i-5)*width/12)+((i-5)*5)),height/1.086);
    pop();
    
    textSize(40);
    //Drawing health
    if (!gameState.team2.players[i-5].armour && !gameState.team2.players[i-5].helmet) {
        if (gameState.team2.players[i-5].health == 0) {
            image(dead,(((width/2)+(width/9)+(width/192))-(width/160))+(((i-5)*width/12)+((i-5)*5)),height/1.21,dead.width*1.25,dead.height*1.25);
        }
        else {
            text(gameState.team2.players[i-5].health,(((width/2)+(width/9)+(width/192))-(width/160))+(((i-5)*width/12)+((i-5)*5)),height/1.1935);
        }
    }
    else {
        text(gameState.team2.players[i-5].health,(((width/2)+(width/9)+(width/192))-(width/58))+(((i-5)*width/12)+((i-5)*5)),height/1.1935);
    }
    //Drawing armour icon
    if (gameState.team2.players[i-5].armour && !gameState.team2.players[i-5].helmet) {
        image(armour,(((width/2)+(width/7)+(width/192))-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.21,armour.width/6.2,armour.height/6.2);
    }
    if (gameState.team2.players[i-5].armour && gameState.team2.players[i-5].helmet) {
        image(armourHelmet,(((width/2)+(width/7)+(width/192))-(width/52))+(((i-5)*width/12)+((i-5)*5)),height/1.21,armourHelmet.width/6.2,armourHelmet.height/6.2);
    }

    //Drawing loadout
    push();
    loadoutWidth = 0;
    imageMode(CORNER);
    for (k=0;k<gameState.team2.players[i-5].loadout.length;k++) {
        x = gameState.team2.players[i-5].loadout[k].height/(height/60);
        yyyyy = gameState.team2.players[i-5].loadout[k].width/x;
        image(gameState.team2.players[i-5].loadout[k],(width/26+(width/2)+(width/30)+((i-5)*width/12)+((i-5)*5))+(loadoutWidth),height/1.043,yyyyy,height/60);
        loadoutWidth += gameState.team2.players[i-5].loadout[k].width;
    }
    
    pop();
    }
}

let wipe1y = 1, wipe2y = 1;
let slices = [];
function roundWinBanner() {
    push();
    fill("black");
    stroke("black");
    rect(width/2.795,width/12,width/3.51,wipe1y);
    pop(); 
    wipe1y += 2;
    if (wipe1y>=height/6.35294117647) {
        wipe1y=height/6.35294117647; 
    }
    wipe1y += sin(scaleBetween(wipe1y,0,height/6.35294117647,0,180))*10;
  
    push();
    fill("white");
    stroke("white");
    rect(width/2.795,width/12,width/3.51,wipe2y);
    pop();
    
    wipe2y += 1;
    wipe2y += sin(scaleBetween(wipe2y,0,height/6.35294117647,0,180))*9;
    winningTeam = null;
    if (!swapedSides) {
        winningTeamName = overlayData.round.win_team == "CT" ? gameState.team2.name : gameState.team1.name;
        winningTeam = overlayData.round.win_team == "CT" ? team2Logo : team1Logo;
    }
    else {
        winningTeamName = overlayData.round.win_team == "CT" ? gameState.team1.name : gameState.team2.name;
        winningTeam = overlayData.round.win_team == "CT" ? team1Logo : team2Logo;
    }
    //winningTeam = defaultIcon;
    winningTeam.resize(width/11.4, width/11.4)
    
    slice = winningTeam.get(0,0,winningTeam.width,wipe1y);
    image(slice,width/2.78,width/11.8);
    textFont(golcaExtraBold);
    textSize(80);
    //console.log(width/13.3)
    if (wipe1y > width/15.3) {
        text(winningTeamName,width/2.2,width/7.3);
    }
    if (wipe1y > width/13.3) {
        textSize(30);
        text("WINS THE ROUND",width/2.2,width/6.49)
    }
}
function resetWinBanner() {
    wipe1y = 0;
    wipe2y = 0;
    slices = [];
}

//DONT FUCKING TOUCH EVER PLS
function generateLoadout(index) {
    loadoutToReturn = [];
    //console.log(Object.keys(allPlayers[index].weapons).length)
    for(j = 0; j<Object.keys(allPlayers[index].weapons).length;j++) {
        currentItem = allPlayers[index].weapons["weapon_"+j];
        //console.log(currentItem)
        if (currentItem.type == "Knife") {
            continue;
        }
        if (currentItem.name == "weapon_c4") {
            //loadoutToReturn.push(loadoutIcons[3].resize(loadoutIcons[3].width/5,loadoutIcons[3].height/5));
        }
        else if(currentItem.name == "weapon_ak47") {
            loadoutToReturn.push(loadoutIcons[0]);
        }
        else if(currentItem.name == "weapon_aug") {
            loadoutToReturn.push(loadoutIcons[1]);
        }
        else if(currentItem.name == "weapon_awp") {
            loadoutToReturn.push(loadoutIcons[2]);
        }
        else if(currentItem.name == "weapon_famas") {
            loadoutToReturn.push(loadoutIcons[9]);
        }
        else if(currentItem.name == "weapon_g3sg1") {
            loadoutToReturn.push(loadoutIcons[12]);
        }
        else if(currentItem.name == "weapon_galilar") {
            loadoutToReturn.push(loadoutIcons[13]);
        }
        else if(currentItem.name == "weapon_m4a1") {
            loadoutToReturn.push(loadoutIcons[18]);
        }
        else if(currentItem.name == "weapon_m4a1_silencer") {
            loadoutToReturn.push(loadoutIcons[17]);
        }
        else if(currentItem.name == "weapon_scar20") {
            loadoutToReturn.push(loadoutIcons[33]);
        }
        else if(currentItem.name == "weapon_sg556") {
            loadoutToReturn.push(loadoutIcons[35]);
        }
        else if(currentItem.name == "weapon_ssg08") {
            loadoutToReturn.push(loadoutIcons[34]);
        }
        else if(currentItem.name == "weapon_bizon") {
            loadoutToReturn.push(loadoutIcons[30]);
        }
        else if(currentItem.name == "weapon_mac10") {
            loadoutToReturn.push(loadoutIcons[20]);
        }
        else if(currentItem.name == "weapon_mp5sd") {
            loadoutToReturn.push(loadoutIcons[23]);
        }
        else if(currentItem.name == "weapon_mp7") {
            loadoutToReturn.push(loadoutIcons[42]);
        }
        else if(currentItem.name == "weapon_mp9") {
            loadoutToReturn.push(loadoutIcons[24]);
        }
        else if(currentItem.name == "weapon_p90") {
            loadoutToReturn.push(loadoutIcons[27]);
        }
        else if(currentItem.name == "weapon_ump45") {
            loadoutToReturn.push(loadoutIcons[38]);
        }
        else if(currentItem.name == "weapon_m249") {
            loadoutToReturn.push(m249IcloadoutIcons[19]);
        }
        else if(currentItem.name == "weapon_mag7") {
            loadoutToReturn.push(loadoutIcons[21]);
        }
        else if(currentItem.name == "weapon_negev") {
            loadoutToReturn.push(loadoutIcons[25]);
        }
        else if(currentItem.name == "weapon_nova") {
            loadoutToReturn.push(loadoutIcons[26]);
        }
        else if(currentItem.name == "weapon_sawedoff") {
            loadoutToReturn.push(loadoutIcons[32]);
        }
        else if(currentItem.name == "weapon_xm1014") {
            loadoutToReturn.push(loadoutIcons[40]);
        }
        else if(currentItem.name == "weapon_cz75a") {
            loadoutToReturn.push(loadoutIcons[4]);
        }
        else if(currentItem.name == "weapon_deagle") {
            loadoutToReturn.push(loadoutIcons[5]);
        }
        else if(currentItem.name == "weapon_elite") {
            loadoutToReturn.push(loadoutIcons[8]);
        }
        else if(currentItem.name == "weapon_fiveseven") {
            loadoutToReturn.push(loadoutIcons[10]);
        }
        else if(currentItem.name == "weapon_glock") {
            loadoutToReturn.push(loadoutIcons[14]);
        }
        else if(currentItem.name == "weapon_hkp2000") {
            loadoutToReturn.push(loadoutIcons[29]);
        }
        else if(currentItem.name == "weapon_p250") {
            loadoutToReturn.push(loadoutIcons[28]);
        }
        else if(currentItem.name == "weapon_revolver") {
            loadoutToReturn.push(loadoutIcons[31]);
        }
        else if(currentItem.name == "weapon_tec9") {
            loadoutToReturn.push(loadoutIcons[37]);
        }
        else if(currentItem.name == "weapon_usp_silencer") {
            loadoutToReturn.push(loadoutIcons[39]);
        }
        else if(currentItem.name == "weapon_decoy") {
            loadoutToReturn.push(loadoutIcons[6]);
        }
        else if(currentItem.name == "weapon_flashbang") {
            loadoutToReturn.push(loadoutIcons[11]);
        }
        else if(currentItem.name == "weapon_hegrenade") {
            loadoutToReturn.push(loadoutIcons[15]);
        }
        else if(currentItem.name == "weapon_incgrenade") {
            loadoutToReturn.push(loadoutIcons[16]);
        }
        else if(currentItem.name == "weapon_molotov") {
            loadoutToReturn.push(loadoutIcons[22]);
        }
        else if(currentItem.name == "weapon_smokegrenade") {
            loadoutToReturn.push(loadoutIcons[36]);
        }
        else if(currentItem.name == "weapon_taser") {
            loadoutToReturn.push(loadoutIcons[41]);
        }
        else {
            console.log("UNKNOWN WEAPON: "+currentItem.name);
        }   
    }
    return loadoutToReturn;
}