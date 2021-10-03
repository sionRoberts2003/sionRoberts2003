final int[] Size = {800, 500};
Robot robot;

void settings()
{
  size(Size[0], Size[1], P3D);
  robot = new Robot();
}
void setup()
{
}
void draw()
{
  rotateX(-0.5);
  rotateY(-0.5);
  background(255);
  robot.show();
  fill(255, 0, 0);
  drawBox(0, 252.5 + 75, 0, 2000, 1, 1000);
}
