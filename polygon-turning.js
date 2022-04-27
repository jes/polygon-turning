// setup:
var num_inserts = 3;
var gear_ratio = 2;
var rpm = 20;
var cutter_radius = 45; // mm
var stock_radius = 20; // mm
var centre_separation = 60; // mm

// simulation:
var px_per_mm = 3;
var fix_camera_to_stock = true;

// state:
var theta = 0; // radians

function setup() {
  createCanvas(600, 400);
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
    circle(0,0,centre_separation*2);
    fill(255);
  }
  circle(0,0,stock_radius * 2);
  line(0,0,0,stock_radius);
  circle(0,0,5);
}

function draw_cutter() {
  for (var i = 0; i < num_inserts; i++) {
    line(0,0,0,cutter_radius);
    rotate(TWO_PI/num_inserts);
  }
  circle(0,0,5);
}
