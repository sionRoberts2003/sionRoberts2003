class Grid
{
  constructor(Width, Height)
  {
    this.Width = Width;
    this.Height = Height;
    this.cells = [];
    for(let y = 0; y < this.Height; y++)
    {
      this.cells.push([]);
      for(let x = 0; x < this.Width; x ++)
      {
        this.cells[y].push(round(random(0, 1)));
        if (this.cells[y][x] > 1)
      {
        this.cells[y][x] = 0;
      }
      }
    }
  }
  show()
  {
    
    fill(255);
    //print(true);
    for(let y = 1; y < this.Height-1; y++)
    {
      for(let x = 1; x < this.Width-1; x++)
      {
        if (this.cells[y][x] == 1)
        {
          rect(x*(width/this.Width), y*(height/this.Height),(width/this.Width), (height/this.Height));
        }
      }
    }
    this.update();
  }
  update()
  {
    this.nextGen = [];
    for(let y = 0; y < this.Height-0; y++)
    {
      this.nextGen.push([]);
      for(let x = 0; x < this.Width-0; x++)
      {
        this.nextGen[y].push(0);
        this.checkRules(y, x);
      }
    }
    this.cells = this.nextGen;
  }
  checkRules(indexY, indexX)
  {
    //if (this.cells[indexY][indexX] == 1)
    //{
      let count = 0;
      for (let j = -1; j < 2; j++)
      {
        for (let i = -1; i < 2; i++)
      {
        if ((j != 0 || i != 0) && (indexY + j >= 0 && indexX + i >= 0) && (indexY + j < this.Height && indexX + i < this.Width))
        {
          if (this.cells[indexY+j][indexX+i])
          {
            count ++;
          }
        }
      }
      }
      if ((count ==2 || count == 3) && this.cells[indexY][indexX] == 1)
      {
        this.nextGen[indexY][indexX] = 1;
      }
      else if (count == 3)
      {
        this.nextGen[indexY][indexX] = 1;
      }
      else
      {
        this.nextGen[indexY][indexX] = 0;
      }
    //}
  }
}
