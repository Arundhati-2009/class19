var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play" ;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 // spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
 background(0);
  if (gameState=="play"){
    if(keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
      if(keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    if(keyDown("space")){
      ghost.velocityY=-10;
      
    }
    ghost.velocityY=ghost.velocityY+0.5;
    if(tower.y>400){
      tower.y=300;
      
    }
    spawnDoors();
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y>400){
      ghost.destroy();
      gameState="end";
    }
    drawSprites();
  }
  if(gameState=="end"){
    stroke("yellow");
    textSize(20);
    text("Game Over",300,300);
    
  }
  
}

function spawnDoors() {
 if(frameCount%300==0){
   var door=createSprite(200,-50);
   door.velocityY=1;
   doorsGroup.add(door);
   door.addImage(doorImg);
   door.lifetime=800;
   door.x=Math.round(random(150,400));
   var climber=createSprite(200,10);
   climber.addImage(climberImg);
   climber.velocityY=1;
   climbersGroup.add(climber);
   climber.lifetime=800;
   climber.x=door.x;
 }
}

