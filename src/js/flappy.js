var level = new Level();

function preload() {
   level.preload();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60); 
  level.setup();
}

function keyPressed() {
   level.keyPressed();
}

function draw() {
   level.update();
   level.render();
}