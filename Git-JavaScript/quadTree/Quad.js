class tree{
  constructor(entities){
    this.tree =[[[[0, 0, width, height]]]];
    this.entities = entities;
  }
  build(){
    let Lx = width;
    let Located = false;
    this.tree =[[[[0, 0, width, height]]]];
    while(Lx > 10){
    for (let y = 0; y < this.tree.length; y++){
        for (let x = 0; x < this.tree[y].length; x++){
          for (let z = 0; z < this.tree[y][x].length; z++){
          let Tx = this.tree[y][x][z][0];
          let Ty = this.tree[y][x][z][1];
          Lx = abs(Tx - this.tree[y][x][z][2]);
          let Ly = abs(Ty - this.tree[y][x][z][3]);
          if (mouseX <= (Tx + Lx) && mouseX >= (Tx) && mouseY <= (Ty + Ly) && mouseY >= Ty){
            this.tree[y][x]=[[Tx, Ty, (Tx + Lx/2), (Ty + Ly/2)],
                           [(Tx + Lx/2), (Ty), (Tx + Lx), (Ty + Ly/2)], 
                           [(Tx + Lx/2), (Ty + Ly/2), (Tx + Lx), (Ty + Ly)], 
                           [Tx, (Ty + Ly/2), (Tx + Lx/2), (Ty + Ly)]];
            rect(Tx, Ty, Lx, Ly);
          }
      }
    }
  }
    
    }
  }
  show(){
    for (let y = 0; y < this.tree.length; y++){
      for (let x = 0; x < this.tree[y].length; x++){
        for (let z = 0; z < this.tree[y][x].length; z++){
          //print(this.tree[y][x][z]);
          let Tx = this.tree[y][x][z][0];
          let Ty = this.tree[y][x][z][1];
          let Lx = abs(Tx - this.tree[y][x][z][2]);
          let Ly = abs(Ty - this.tree[y][x][z][3]);
          noFill();
          rect(Tx, Ty, Lx, Ly);
          
      }
      }
    }
  }
}
