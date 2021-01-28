// Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, fruit, monster;
var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage ;

var gameover, gameoverImage;

var fruitGroup, monsterGroup;

function preload(){
  swordImage = loadImage("sword.png");
  monsterImage = loadImage("alien1.png","alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
 
  gameoverImage = loadImage("gameover.png");
}

function setup(){
  createCanvas(600, 600);
 
  sword = createSprite (40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
 
  sword.setCollider("rectangle",0,0,40,40);
 
  score=0;
  fruitGroup = createGroup();
  monsterGroup = createGroup();
}

function draw(){

  background("lightblue");
  text("Score: "+ score, 500,50);
 
  if(gameState === PLAY){
   
    fruit();
    monster();
    sword.y=World.mouseY;
    sword.x=World.mouseX;
   
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score = score+2;
    }
      if(monsterGroup.isTouching(sword)){
        gameState=END;
      }
  }
  else if (gameState === END){
   
    fruitGroup.destroyEach();
    monsterGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    monsterGroup.setVelocityXEach(0);
   
    sword.addImage(gameoverImage);
    sword.x=200;
    sword.y=200;
  }
 

  drawSprites();
}

function fruit(){
  if(World.frameCount%80===0){
    var fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r=Math.round(random(1,4));
    if(r==1) {
      fruit.addImage(fruit1);
    } else if (r==2) {
      fruit.addImage(fruit2);
    } else if (r==3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    fruit.y=Math.round(random(50,340));
 
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
   
    fruitGroup.add(fruit);
 
    }
  }


function monster(){
  if(World.frameCount%200===0){
    var monster=createSprite(400,200,20,20);
    monster.addAnimation("moving",monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX=-12;
    monster.setLifetime = 50;
   
    monsterGroup.add(monster);
  }
}
