let grid;

function setup() {
  frameRate(20);
  createCanvas(windowWidth, windowHeight);
  grid = new Grid(400, 200);
}

function draw() 
{
  background(0);
  grid.show();
}
