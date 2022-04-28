// setup:
var num_inserts = 3;
var gear_ratio = 2;
var rpm = 10;
var cutter_radius = 45; // mm
var stock_radius = 20; // mm
var centre_separation = 60; // mm

// simulation:
var px_per_mm = 3;
var fix_camera_to_stock = false;

// state:
var theta = 0; // radians

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent('canvas');
}

function draw() {
  background(220);
  
  var radians_per_min = rpm * TWO_PI;
  var radians_per_ms = radians_per_min / 60000;
  theta += radians_per_ms * deltaTime;
  while (theta > TWO_PI) theta -= TWO_PI;
  
  var stock_centre = stock_radius + 50;
  var cutter_centre = stock_centre + centre_separation;
  
  var centre_mm = 200/px_per_mm;
  
  scale(px_per_mm);
  
  translate(stock_centre,centre_mm);
  if (!fix_camera_to_stock)
    rotate(theta);
  draw_stock();
  rotate(-theta);
  translate(-stock_centre, -centre_mm);
  
  translate(cutter_centre, centre_mm);
  rotate(theta*gear_ratio);
  draw_cutter();
  rotate(-theta*gear_ratio);
  translate(-cutter_centre, -centre_mm);
}

function draw_stock() {
  if (fix_camera_to_stock) {
    noFill();
    stroke(150);
    circle(0,0,centre_separation*2);
    fill(255);
    stroke(0);
  }

  rotate(45*PI/180);

  circle(0,0,stock_radius * 2);
  line(0,0,0,stock_radius);
  circle(0,0,5);

  if (fix_camera_to_stock) {
    noFill();
    stroke(150);
    rotate(60*PI/180);
    ellipse(0,0,210,28);
    rotate(60*PI/180);
    ellipse(0,0,210,28);
    rotate(60*PI/180);
    ellipse(0,0,210,28);
    rotate(-180*PI/180);
    fill(255);
    stroke(0);
  }

  polygon(0,0,centre_separation-cutter_radius+1,gear_ratio*num_inserts);
  rotate(-45*PI/180);
}

function draw_cutter() {
  for (var i = 0; i < num_inserts; i++) {
    line(0,0,0,cutter_radius);
    rotate(TWO_PI/num_inserts);
  }
  circle(0,0,5);
}

// https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
