class Robot
{
  Leg legs[] = {new Leg(0, 1, 20, 0, 0), new Leg(1, 1, -20, 0, 0), new Leg(2, 1, 20, 0, 0),
                  new Leg(0, -1, -20, 0, 0), new Leg(1, -1, 20, 0, 0), new Leg(2, -1, -20, 0, 0)};
  Robot()
  {
    
  }
  void show()
  {
    this.buildBot();
    for (int leg = 0; leg < this.legs.length; leg ++)
    {
      this.legs[leg].show();
    }
  }
  void buildBot()
{
  fill(0, 255, 0);
  drawBox(200, 250, 0, 200, 10, 100);
  drawSphere(100, 252.5, 50, 10);
  drawSphere(100, 252.5, -50, 10);
  drawSphere(200, 252.5, 50, 10);
  drawSphere(200, 252.5, -50, 10);
  drawSphere(300, 252.5, 50, 10);
  drawSphere(300, 252.5, -50, 10);
}
}

class Leg
{
  int Pos;
  float Dir;
  float x;
  float y;
  float z;
  float HipAngleY;
  float HipAngleX;
  float kneeAngle;
  float kneeJoint[] = new float[3];
  float Toe[] = new float[3];
  boolean returning = false;
  
  Leg(int Pos, int Dir, float x, float y, float z)
  {
    this.kneeJoint[0] = 100 + (Pos*100);
    this.kneeJoint[1] = 252.5;
    this.kneeJoint[2] = 50+50 * Dir;
    this.Toe[0] = this.kneeJoint[0];
    this.Toe[1] = 252.5 + 75;
    this.Toe[2] = this.kneeJoint[2];
    this.Pos = Pos;
    this.Dir = Dir;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  void Update()
  {
    float offsetZ = (sqrt(pow(50-this.z, 2) + pow(this.x, 2))-50+this.z)*this.Dir;
    float h1 = (75-this.y) - sqrt(pow(75,2) - pow(this.z + offsetZ,2));
    float theta = (asin(h1/50)*180/PI) + 90;
    float A1 = sin(theta * (PI/180)) * 50;
    float A = (asin((50-A1 + this.z + offsetZ)/75)*180/PI)+ 90;
    float HipAngleX = atan(this.x/(50+this.z))*180/PI;
    float Dy = -cos(theta * (PI/180)) * 50;
    float roe = sqrt(pow(50, 2) - pow(Dy, 2));
    float Dx = sin(HipAngleX * (PI/180))*roe;
    int sign = (int(this.x)*2-1)%2;
    this.kneeJoint[2] = (150 * Dir) - (sin(theta * (PI/180)) * 50 * this.Dir);
    this.kneeJoint[1] = 252.5 - cos(theta * (PI/180)) * 50;
    this.kneeJoint[0] = 100 + (Pos*100) + Dx;
    this.Toe[2] = this.kneeJoint[2] + (cos(A * (PI/180)) * 75);
    this.Toe[1] = this.kneeJoint[1] + sin(A * (PI/180)) * 75;
    this.Toe[0] = 100 + (Pos*100) + this.x;
    println(this.z, this.x);
  }
  void cycleEnd()
  {
    if (this.z * this.Dir  > 0 && !returning)this.z -= this.Dir/3 ;
    if (this.x > -20 && !returning)this.x-=1;
    if(int(this.z) * this.Dir == 0 && int(this.x) == -20)
    {
      this.returning = true;
      this.y = 0;
    }
    if(this.returning && this.z * this.Dir < 10)this.z += this.Dir/3 ;
    if (this.x < 20 && returning)this.x+=1;
    if(int(this.z) * this.Dir  == 10 && int(this.x) == 20)
    {
      this.returning = false;
      this.y = 0;
    }
    if(this.returning)this.y = 20*cos(asin(this.x/20));
  }
  void cycleMid()
  {
    //this.
  }
  void show()
  {
    this.Update();
    if(this.Pos != 1)this.cycleEnd();
    else this.cycleMid();
    line(100 + this.Pos*100, 252.5, 50*this.Dir, this.kneeJoint[0], this.kneeJoint[1], this.kneeJoint[2]);
    drawSphere(this.kneeJoint[0], this.kneeJoint[1], this.kneeJoint[2], 5);
    line(this.kneeJoint[0], this.kneeJoint[1], this.kneeJoint[2], this.Toe[0], this.Toe[1], this.Toe[2]);
    drawSphere(this.Toe[0], this.Toe[1], this.Toe[2], 5);
  }
}
