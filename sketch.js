const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;

var tower;
var backgroundImg

var cannon,cannonball
var angle

var balls = []

var boatAnimation = []
var boatSpriteData, boatSpriteSheet
var boats = []

function preload() {
  backgroundImg = loadImage("assets/background.gif")    
  
  boatSpriteData = loadJSON("assets/boat/boat.json")
  boatSpriteSheet = loadImage("assets/boat/boat.png")
}


function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  tower = new Tower(150,350,160,310)

  angle = -PI/4
  cannon = new Cannon(180,110,110,50,angle)

  boat = new Boat(width,height - 100,200,200,-100)

  var boatFrames = boatSpriteData.frames
  for (var i = 0;i < boatFrames.length;i++) {
    var position = boatFrames[i].position
    var image = boatSpriteSheet.get(position.x,position.y,position.width,position.height)
    boatAnimation.push(image)
  }

  rectMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() 
{
  background(51);
  image(backgroundImg,0,0,width,height)

  tower.show()

 

  Engine.update(engine);

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i)
  }

  cannon.display()

  boat.display()
  Matter.Body.setVelocity(boat.body,{x:-0.9,y:0})
}

function keyReleased() {
  if (keyCode == DOWN_ARROW) {
    balls[balls.length - 1].shoot()
  }
}

function keyPressed() {
  if(keyCode == DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x,cannon.y)  
    balls.push(cannonBall)
  }
}

function showCannonBalls(ball,index) {
  ball.display()
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    World.remove(world,ball.body)
    balls.splice(index,1)
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (boats.length < 4 && boats[boats.length - 1].body.position.x < width-300) {
      var positions = [-40,-60,-70,-20]
      var position = random(positions)
      var boat = new Boat(width,height - 100,170,170,position,boatAnimation)
      boats.push(boat)
    }
    for (var i = 0;i < boats.length;i++) {
      Matter.Body.setVelocity(boats[i].body,{x:-0.9,y:0})
      boats[i].display()
      boats[i].animate()
    }
  }
  else {
    var boat = new Boat(width,height - 100,170,170,-60,boatAnimation)
    boats.push(boat)
  }
}


