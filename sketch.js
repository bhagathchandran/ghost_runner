var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisibleBlockGroup,invisibleBlock;
var spookySound;

var gameState = "play";


function preload(){
  towerImg = loadImage("tower.png")
  doorImg = loadImage("door.png")
  doorsGroup = new Group();
  climberImg = loadImage("climber.png")
  climbersGroup = new Group();
  ghostImg = loadImage("ghost-standing.png")
  invisibleBlockGroup = new Group();
  spookySound = loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
  tower  = createSprite(300,300)
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;
  
  spookySound.loop(); 
}

function draw(){
  background("black");
  if(gameState === "play"){
    if(tower.y>400){
      tower.y = 300;
    }

    if(keyDown("left_arrow")){
      ghost.x = ghost.x-3
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x+3
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.5; 

    if (climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
      gameState = "end";
      ghost.destroy();
    }
    
    spawnDoors();
     drawSprites();
  }
  
  if(gameState === "end"){
    text("GAME OVER",230,250);
    textSize(30);
    stroke("yellow");
    fill("yellow");
  }
  
}

function spawnDoors(){
  if(frameCount % 240  ===  0){
    var door = createSprite(200,-50);
    door.addImage(doorImg);
    
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    
    var invisibleBlock = createSprite(200,15)
    invisibleBlock.width = climber.width;
    invisibleBlock.height  = 2;
    
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    
    ghost.depth = door.depth
    ghost.depth += 1  
    climber.x = door.x;
    climber.velocityY = 1;
    
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = 1;
    
    invisibleBlock.debug = true;
    
    climber.lifetime = 800;
    climbersGroup.add(climber);
    doorsGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);
  }
}