var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime = 0
var ground

function preload() {

  monkey_running =
    loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {

  createCanvas(600, 320)

  bananaGroup = createGroup()
  obstacleGroup = createGroup()

  monkey = createSprite(100, 200, 20, 20)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.2

  ground = createSprite(270, 310, 1200, 20)
  ground.velocityX=-4
  ground.x = ground.width / 2;
}

function draw() {

  background(rgb(200, 600, 600))

  monkey.collide(ground)

  if (keyDown("space") && monkey.y >= 150) {
    monkey.velocityY = -12;
  }

  monkey.velocityY = monkey.velocityY + 0.8

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }
  
  if (monkey.isTouching(obstacleGroup)){
    ground.velocityX=0
  }
  
  //console.log(frameCount)

  banana()
  obstacle()
  
  stroke("black")
  textSize(20)
  fill("white")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 15, 30)
  
  drawSprites()
}

function banana() {
  if (frameCount % 80 === 0) {
    var food = createSprite(600, 120, 40, 10);
    food.y = Math.round(random(120, 200));
    food.addImage(bananaImage);
    food.scale = 0.17;
    food.velocityX = -3;
    food.lifetime = 250
    bananaGroup.add(food)
  }
}

function obstacle(){
   if (frameCount % 100 === 0) {
    var rock = createSprite(600, 270, 40, 10);
    rock.addImage(obstacleImage);
    rock.scale = 0.18;
    rock.velocityX = -7;
    rock.lifetime = 250
    obstacleGroup.add(rock)
  }
  
}