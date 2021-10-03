class particle{
  constructor(x, y){
    this.co = createVector(x, y);
  }
  show(){
    ellipse(this.co.x, this.co.y, 10);
  }
}
