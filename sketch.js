var tower, timage, door, dimage, dgroup
var climber, cimage, cgroup
var ghost, gimage
var gamestate=1, iclimber, igroup

function preload () {
timage=loadImage("tower.png");
dimage=loadImage("door.png");
cimage=loadImage("climber.png");
gimage=loadImage("ghost-standing.png");

}


function setup () {
createCanvas(600,600);
tower=createSprite(300,300,600,600);
tower.addImage(timage);
tower.velocityY=1;

dgroup=new Group();
cgroup=new Group();
igroup=new Group();

ghost=createSprite(200,200,30,30);
ghost.scale=.3;
ghost.addImage(gimage);
}

function draw () {
background("brown");

if(gamestate===1) {

if(tower.y>400) {
tower.y=300;
}

if(keyDown("space")) {
ghost.velocityY=-6
}

if(keyDown("left")) {
ghost.x-=2;
}

if(keyDown("right")) {
ghost.x+=2;
}

if(cgroup.isTouching(ghost)) {
ghost.velocityY=0
}

ghost.velocityY+=0.5

if(igroup.isTouching(ghost)|| ghost.y>600) {
gamestate=0;
}

spawndoors();
}

if(gamestate===0) {
ghost.destroy();
tower.destroy();
dgroup.destroyEach();
cgroup.destroyEach();
fill("yellow");
textSize(30);
text("gameover",250,250);

}
drawSprites();
}

function spawndoors () {

if(frameCount%255===0) {
door=createSprite(50,-2,20,20);
climber=createSprite(50,50,20,20);
iclimber=createSprite(50,60,50,2);
climber.addImage(cimage);
door.x=Math.round(random(100,500));
climber.x=door.x;
climber.velocityY=1;
iclimber.x=door.x;
door.velocityY=1;
door.addImage(dimage);
dgroup.add(door);
cgroup.add(climber);
climber.lifetime=800;
door.lifetime=800;
ghost.depth=door.depth+1
iclimber.velocityY=1;
iclimber.lifetime=800;
igroup.add(iclimber);
iclimber.visible=false;
}
}