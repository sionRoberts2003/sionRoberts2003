class World
{
  constructor(grid)
  {
    this.grid = grid;
  }
  build()
  {
    let w = 300/this.grid.length;
    let h = 300/this.grid[0].length;
    for (let y = 0; y < this.grid.length; y++)
    {
      for (let x = 0; x < this.grid[y].length; x++)
      {
        if (this.grid[y][x] == 1)
        {
          let X = w*x;
          let Y = h*y;
          walls.push(new boundary(X, Y, X+w, Y));
          walls.push(new boundary(X+w, Y, X+w, Y+h));
          walls.push(new boundary(X+w, Y+h, X, Y+h));
          walls.push(new boundary(X, Y, X, Y+h));
        }
      }
    }
  }
  ThreeD(rays, thickness, MaxHeight)
{
  fill(255, 0, 0);
  let start = height - MaxHeight;
  for (let ray = 0; ray < rays.length; ray++)
  {
    let Len = (MaxHeight - rays[ray][0]);//- abs(ray - player.Res/2);
    if (Len < 0)
  {
    Len = 0;
  }
  stroke(0, pow((rays[ray][0]*0.6375)/15.46-15.46, 2), 0);
  fill(0, pow((rays[ray][0]*0.6375)/15.46-15.46, 2), 0);
  rect(width/4 + ray*thickness, start - (Len/2), thickness, Len);
  }
}
}
