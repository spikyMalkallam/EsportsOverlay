function drawCSGOTopShelf(overlayInfo) {
    //Centre Rectangle
    push();
    textFont(golcaExtraBold);
    noStroke();
    fill(255,255,255,230);
    rect((width/2)-(width/8), height/30, width/4, height/10);
    //Icons
    image(anuEsportIcon, (width/2)-(width/7.9), height/30, height/10,height/10);
    image(qutEsportIcon, (width/2)+(width/14), height/30, height/10,height/10);
    //Team names
    textSize(height/16)
    fill("white")
    text(overlayInfo.map.team_t.name,(width/2)-(width/8)-overlayInfo.map.team_t.name*(height/20),height/9.7);
    text(overlayInfo.map.team_t.name,(width/2)+(width/8)+(width/370),height/9.7);
    pop();
  }