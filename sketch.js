var climberImg, doorImg, randomdoorx;
var ghost, ghostImg1, ghostImg2;
var spookymusic;
var tower, towerImg;
var start, death;

PLAY = 1;
END = 0;
var gameState = PLAY;

function preload(){
  climberImg = loadImage("climber.png");
  doorImg = loadImage("door.png");
  ghostImg1 = loadAnimation("ghost-jumping.png");
  ghostImg2 = loadAnimation("ghost-standing.png");
  towerImg = loadImage("tower.png");

  spookymusic = loadSound("spooky.wav");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  tower = createSprite(width/2,height/2,10,10);
  tower.addImage(towerImg);
  tower.velocityY = 5;
  tower.scale = 0.0017*width;

  ghost = createSprite((width/2),(height - 100),10,10);
  ghost.addAnimation("jumping",ghostImg1);
  ghost.addAnimation("standing",ghostImg2);
  ghost.scale = 0.5;

  death = createGroup();
  doors = createGroup();
  climbers = createGroup();
}

function draw(){
  background(0);

  if (gameState == PLAY){
    if (keyDown("left")){
      ghost.x -=5;
    }
    if (keyDown("right")){
      ghost.x +=5;
    }
    if (keyWentDown("up") && ghost.y > 50){
      ghost.velocityY = -10;
    }

    if (ghost.isTouching(climbers)){
      ghost.velocityY = 0;
    }

    if (ghost.isTouching(death) || ghost.y > height){
      gameState = END;
    }

    ghost.velocityY += 0.5;

    if (tower.y > height){
      tower.y = tower.height/2;
    }

    if (frameCount % 120 == 0){
      spawnDoor();
    }
  }
  else{
    climbers.destroyEach();
    doors.destroyEach();
    ghost.destroy();
    tower.destroy();

    textSize(100);
    fill("white");
    text("GAME OVER", 100, ((height/2)-50))
  }

  drawSprites();
}

function spawnDoor(){
  randomdoorx = Math.round(random(300,width-300));

  var door = createSprite(randomdoorx,-120,10,10);
  door.addImage(doorImg);
  door.scale = 0.0012*width;
  door.velocityY = 5;
  door.lifetime = 1000;
  doors.add(door);

  var climber = createSprite(randomdoorx,-20,10,10);
  climber.addImage(climberImg);
  climber.scale = 0.0012*width;
  climber.velocityY = 5;
  climber.lifetime = 1000;
  climbers.add(climber);

  var deathground = createSprite(randomdoorx,0,width/8,10);
  deathground.velocityY = 5;
  deathground.visible = false;
  deathground.lifetime = 1000;
  death.add(deathground);

  ghost.depth = climber.depth + 1;
}