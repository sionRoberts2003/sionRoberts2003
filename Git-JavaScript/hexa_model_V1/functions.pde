void drawSphere(float x, float y, float z, float r)
{
  translate(x, y, z);
  sphere(r);
  translate(-x, -y, -z);
}

void drawBox(float x,float y,float z,float w,float h,float d)
{
  translate(x, y, z);
  box(w, h, d);
  translate(-x, -y, -z);
}
