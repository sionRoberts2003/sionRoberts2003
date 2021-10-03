class noise
{
  constructor(Width, Height)
  {
    
    this.CellWidth = (width/Width);
    this.CellHeight = (height/Height);
    this.dim = createVector(Width, Height);
    this.maxDistance = sqrt(pow(this.CellWidth, 2)+pow(this.CellHeight, 2));
    this.locations = [];
    for(let y =0; y < this.dim.y; y ++)
    {
      this.locations.push([]);
      for (let x =0; x < this.dim.x; x++)
      {
        this.locations[y].push(createVector((x*this.CellWidth)+round(random(0, this.CellWidth)), (y*this.CellHeight)+round(random(0, this.CellHeight))));
      }
    }
    this.lim = 0;
    this.show();
  }
  show()
  {
    this.calculate();
  }
  calculate()
  {
    for(let i = this.lim; i < this.locations.length; i ++)
    {
      for (let j = 0; j < this.locations[0].length; j ++)
      {
        this.process(j, i);
      }
    }
  }
  check(x, y, px, py)
  {
    let minDistance = 100;
    for (let i = -1; i < 2; i ++)
    {
      for (let j = -1; j < 2; j ++)
      {
        if (x+j >= 0 && x+j < this.locations[y].length && y+i >= this.lim && y+i < this.locations.length)
        {
          let dis = pow(this.locations[y+i][x+j].x - px, 2)+pow(this.locations[y+i][x+j].y - py, 2);
          dis = sqrt(dis);
          if (dis < minDistance)
          {
            minDistance = dis;
          }
        }
      }
    }
    return minDistance;
  }
  process(w, h)
  {
    let res = 1;
    for (let y = 0; y < this.CellHeight; y +=res)
    {
      for (let x = 0; x < this.CellWidth; x+=res)
      {
        let Y = y + h*this.CellHeight;
        let X = x + w*this.CellWidth;
        let distance = this.check(w, h, X, Y); 
        stroke(255 - (distance/this.maxDistance)*255,0,0 );
        fill(255 - (distance/this.maxDistance)*255,0, 0);
        rect(X, Y, res, res);
        
      }
    }
  }
}
