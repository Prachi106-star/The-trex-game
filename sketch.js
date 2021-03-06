var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

//initiate Game STATEs
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var gameoverImage , restartImage , restart , gameOver ;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight);
  
  trex = createSprite(50,365,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
 // trex.isStaic = true ;
  
  ground = createSprite(200,height/2,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,385,6400,10);
  invisibleGround.visible = false;
  
  restart = createSprite(width/2,330,20,20);
  restart.addImage(restartImage);
  restart.scale = 0.5;
  restart.visible = false;
  
  gameOver = createSprite(width/2,300,10,10);
  gameOver.addImage(gameoverImage);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(180);
  
  textSize(50);
  text("Score: "+ score, 50,50);
  
  if (gameState === PLAY){
    
  score = score + Math.round(getFrameRate()/60);
  
     
    ground.velocityX = -(4+3*score/100);    

  if(keyDown("space")&& trex.y >= 290) {
    trex.velocityY = -13;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  camera.position.y = trex.y ;

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  spawnClouds();
  spawnObstacles();
    
 if (obstaclesGroup.isTouching(trex)){
   gameState = END ;
 }    

  }
  
   else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
         
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  
  if(mousePressedOver(restart)) {
    reset();
  }
}
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(1600,220,40,10);
    cloud.y = Math.round(random(180,220));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(1200,365,10,40);
    obstacle.velocityX = -(4+3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
