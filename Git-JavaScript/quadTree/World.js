class World{
  constructor(){
    this.noiseScale = 0.002;
  }
  show() {
  for (let x=0; x < width; x++) {
    let noiseVal = noise((mouseX+x)*this.noiseScale);
    
    line(x, 50+noiseVal*400,x, height);
  }
}
}
