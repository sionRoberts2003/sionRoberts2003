class Player
{
  constructor(grid)
  {
    this.index = 0;
    this.co = createVector(100, 100);
    this.grid = grid;
    this.offset = 0;
    this.Res = 0.25;
    this.FOV = 40;
    this.rays = [];
    for (let R = 0; R < this.FOV/this.Res;R++)
  {
    this.rays.push(0);
  }
    //this.build();
  }
  
  show()
{
  ellipse(this.co.x, this.co.y, 10);
  this.update();
}
controller(){
    if (keyIsDown(87)){
        this.co.x += sin(this.offset);
        this.co.y -= cos(this.offset);
        }
    else if (keyIsDown(65)){
             this.co.x += sin(this.offset-90);
             this.co.y -= cos(this.offset-90);
             }
    else if (keyIsDown(83)){
             this.co.x -= sin(this.offset);
        this.co.y += cos(this.offset);
             }
    else if (keyIsDown(68)){
             this.co.x += sin(this.offset+90);
        this.co.y -= cos(this.offset+90);
             }
    if (keyIsDown(39)){
      this.offset += 1;
    }
    else if (keyIsDown(37)){
      this.offset -= 1;
    }
  }
  update()
  {
    this.offset %= 360;
    this.controller();
    let Location = null;
    this.index = 0;
    this.rays = [];
    for (let wall of walls)
    {
      
      for (let angle = (0-this.FOV/2); angle < (0+this.FOV/2); angle += this.Res){
      let lo = this.calculate(angle, wall);
      let first = this.calculate((-this.FOV/2), wall);
      let last = this.calculate((this.FOV/2), wall);
      if (lo[2])
    {
      let shortest = true;
      let edgeL = false;
      let edgeR = false;
      let OriginalSize = this.Distance(this.co.x, this.co.y, lo[0], lo[1]);
      
      for(let Wall of walls)
    {
      let Location = this.calculate(angle, Wall);
      let NewSize = this.Distance(this.co.x, this.co.y, Location[0], Location[1]);
      if (NewSize < OriginalSize || NewSize == 0)
      {
        shortest = false;
      }
    }
    if (shortest)
  {
    if (OriginalSize < 100 && angle < 0)
  {
    edgeL = true;
  }
  if (OriginalSize > 100 && angle > 0)
  {
    edgeR = true;
  }
  stroke(255);
  print(this.index);
    this.rays[angle + this.FOV/2] = [OriginalSize, edgeL, edgeR];
    if (OriginalSize < 100)
    {
      stroke(255, 0, 0);
    }
    line(this.co.x, this.co.y, lo[0], lo[1]);
    this.index ++;
  }
  
    }
  }
      
    }
    world.ThreeD(this.rays, (800/this.FOV * this.Res), 300);
  }
  Distance(x1, y1, x2, y2)
  {
    let x = pow(x1-x2, 2);
    let y = pow(y1-y2, 2);
    return sqrt(x+y);
  }
  calculate(angle, wall)
  {
    let co2 = createVector(this.co.x + sin(angle + this.offset), this.co.y - cos(angle + this.offset));
    let u = 0;
    let t = 0;
    let x = 0;
    let y = 0;
    let d = ((wall.a.x - wall.b.x) * (this.co.y - co2.y)) - ((wall.a.y - wall.b.y) * (this.co.x - co2.x));
    let t1 = ((this.co.x - wall.a.x)*(wall.a.y - wall.b.y))-((this.co.y - wall.a.y)*(wall.a.x - wall.b.x));
    let u1 = ((co2.x - this.co.x)*(this.co.y - wall.a.y) - (co2.y - this.co.y)*(this.co.x-wall.a.x));
    let u2 = ((this.co.x - co2.x)*(wall.a.y - wall.b.y))-((this.co.y - co2.y)*(wall.a.x - wall.b.x));
    x = ((wall.a.x * wall.b.y - wall.a.y*wall.b.x)*(this.co.x - co2.x))-((wall.a.x-wall.b.x)*(this.co.x*co2.y - this.co.y*co2.x));
    y = ((wall.a.x * wall.b.y - wall.a.y*wall.b.x)*(this.co.y - co2.y))-((wall.a.y-wall.b.y)*(this.co.x*co2.y - this.co.y*co2.x));
    if (u2 != 0)
  {
    u = u1/u2;
    t = t1/u2;
  }
    if (u >= 0 && u <= 1 && t > 0)
    {
      return [x/d, y/d, true];
    }
    return [Infinity, Infinity, false];
  }
}
