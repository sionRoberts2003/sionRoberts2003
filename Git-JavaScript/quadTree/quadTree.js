let world;
let Particle = [];
let Quad;

function setup() {
  createCanvas(1600, 400);
  world = new World();
  Particle.push(new particle(105, 102));
  Particle.push(new particle(600, 100));
  Quad = new tree(Particle);
  Quad.build();
  print(Quad.tree);
}

function draw() {
  noFill();
  background(220);
  Quad.build();
  //Quad.show();
  
}
