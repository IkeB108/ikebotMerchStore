function preload(){
  loadedAllFiles = false;
  shirtOne = loadImage('bot.png')
  shirtTwo = loadImage('bot2.png')
  shirtThree = loadImage('bot3.png')
  getSheeped = loadImage('getSheeped.png')
  beastFont = loadFont('ObelixPro-cyr.ttf')

  sheepHead = loadImage('sheepHead.png')
  sheepRear = loadImage('sheepRear.png')
  sheepSide = loadImage('sheepSide.png')
  vignette = loadImage('vignette.png')

  dubstep = loadSound('sheepDubstep.mp3')
}
function setup() {
  loadedAllFiles = true;
  myCanvas = createCanvas(800,700)
  myCanvas.id('demo')
  imageMode(CENTER,CENTER)
  angleMode(DEGREES)
  textFont(beastFont)
  textAlign(CENTER,CENTER)
  smooth()
  shirtScale = 0.24
  shirtSpace = 150;
  shirtDown = 100;

  searchW = 600;
  searchH = 35;

  getSheepedScale = 0.3;

  animationTimer = -1;
  //set to -1 when animation is not playing
  animationLength = 694
  //round(70 * 11.6)

  flyingSheep = []

}

function draw() {
  background(0)
  fill(255);
  textSize(50);textFont(beastFont);
  if(animationTimer==-1)text('IKEBOT STORE', width/2, 150);
  image(shirtOne, width/2 - shirtSpace, height/2 + shirtDown, shirtOne.width * shirtScale, shirtOne.height * shirtScale)
  image(shirtTwo, width/2, height/2 + shirtDown, shirtOne.width * shirtScale, shirtOne.height * shirtScale)
  image(shirtThree, width/2 + shirtSpace, height/2 + shirtDown, shirtOne.width * shirtScale, shirtOne.height * shirtScale)

  fill(50)

  rect(width/2 - (searchW/2), 237, searchW, searchH )
  fill(0)
  textSize(20);textFont('Arial')
  text('Search...', width/2 - (searchW/2) + 55, 255 )

  updateCursor();
  updateAnimation();
}

function updateCursor(){
  if(collidePointRect( mouseX, mouseY, width/2 - (searchW/2), 237, searchW, searchH ) && animationTimer == -1){
    document.getElementById("demo").style.cursor = "text";
  } else {
    document.getElementById("demo").style.cursor = "default";
  }
}

function mouseClicked(){
  if(loadedAllFiles && collidePointRect( mouseX, mouseY, width/2 - (searchW/2), 237, searchW, searchH ) && animationTimer == -1){
    animationTimer = 0;
    dubstep.play();
  }
}

function updateAnimation(){
  if(animationTimer > -1){
    animationTimer ++;
    background(0,200)
    if(animationTimer > 230){


      if(animationTimer < 450 && animationTimer % 5 == 0){
        flyingSheep.push({
          'x':0,
          'y':185,
          'xvel': random(7, 13),
          'yvel': random(-7, -10)
        })
        flyingSheep.push({
          'x':width,
          'y':185,
          'xvel': -1 * random(7, 13),
          'yvel': random(-7, -10)
        })
      }
      if(animationTimer >= 430 && animationTimer < 610){
        for(var i = 0; i < 2; i ++){
          flyingSheep.push({
            'x':random(50, width-50),
            'y': random(-20,-25) ,
            'xvel': 0,
            'yvel': -9
          })
        }

      }


      if(flyingSheep.length > 100)flyingSheep.shift();

      for(var i = 0; i < flyingSheep.length; i ++){
        flyingSheep[i].yvel += 0.5;
        flyingSheep[i].x += flyingSheep[i].xvel;
        flyingSheep[i].y += flyingSheep[i].yvel;
        image(sheepSide, flyingSheep[i].x, flyingSheep[i].y, sheepSide.width * 0.05, sheepSide.height * 0.05)
      }
      image(vignette, width/2, height/2, width, height)
    }

    if( (withinFlashRange(animationTimer) && frameCount % 2 == 0) || !withinFlashRange(animationTimer) )
    image(getSheeped, width/2, 150, getSheeped.width * getSheepedScale, getSheeped.height * getSheepedScale);

    push();
    translate(width * (1/4) ,height/2)
    rotate(animationTimer%360)
    scale(0.5)
    image(sheepHead, 0, 0)
    pop();

    push();
    translate(width * (3/4) ,height/2)
    rotate(animationTimer%360)
    scale(0.5)
    image(sheepHead, 0, 0)
    pop();


    var sx = (width-200)/4
    var iw = sheepRear.width
    var ih = sheepRear.height
    var is = 0.5 * ( 1 + (animationTimer % 40)/210 )
    var n = 1;
    if(animationTimer % 80 < 40)n = -1;
    for(var i = 0; i < 5; i ++){
      push();
      translate(i * sx + 100, 550)
      scale(is*n, is)
      image(sheepRear, 0, 0)
      pop();
    }


  }
  if(animationTimer >= animationLength){
    animationTimer = -1;
    flyingSheep = []
  }
}

function withinFlashRange(n){
  return (n%120) < 20
  //return ( within(n, 0, 20) || within(n, 60, 80) || within(n, 120, 140) )
}
