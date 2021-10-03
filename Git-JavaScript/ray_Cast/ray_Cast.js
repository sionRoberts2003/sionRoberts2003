let player;
let walls = [];
let world;
function setup() {
  createCanvas(1200, 800);
  angleMode(DEGREES);
  player = new Player();
  world = new World([[1, 1, 1, 1, 1, 1, 1, 1], 
                [1, 0, 0, 0, 0, 0, 0, 1], 
                [1, 0, 0, 0, 0, 0, 0, 1], 
                [1, 0, 0, 0, 0, 0, 0, 1], 
                [1, 0, 0, 0, 0, 0, 0, 1], 
                [1, 0, 0, 0, 0, 0, 0, 1], 
                [1, 0, 0, 0, 0, 0, 1, 1], 
                [1, 1, 1, 1, 1, 1, 1, 1]]);
  world.build();
}


function draw() {
  background(52);
  player.show();
  for (let wall of walls)
  {
    wall.show();
  }
  
}
