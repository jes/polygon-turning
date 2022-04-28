// setup:
var num_inserts = 3;
var gear_ratio = 2;
var rpm = 10;
var cutter_radius = 45; // mm
var stock_radius = 20; // mm
var centre_separation = 60; // mm

// simulation:
var px_per_mm = 2.5;
var fix_camera_to_stock = false;
var show_toolpaths = true;

// state:
var theta = 0; // radians

// bodges:
var extra_angle = [0,0,45,0,22.5,0,45,0,0,0,0,0,0,0,0];
var extra_size = [0,0,1.3,1.1,1,1,1,1,1,1,1,1,1,1,1,1];

function setup() {
    var canvas = createCanvas(600, 400);
    canvas.parent('canvas');
}

function draw() {
    background(220);

    var radians_per_min = rpm * TWO_PI;
    var radians_per_ms = radians_per_min / 60000;
    theta -= radians_per_ms * deltaTime;
    while (theta > TWO_PI) theta -= TWO_PI;

    var stock_centre = stock_radius + 60;
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
    // match rotation of cutter
    rotate(45*PI/180);

    // circular path of cutting tool centre
    if (fix_camera_to_stock) {
        noFill();
        stroke(150);
        circle(0,0,centre_separation*2);
        fill(255);
        stroke(0);
    }

    // circular stock
    circle(0,0,stock_radius * 2);

    // toolpaths of cutting inserts
    if (show_toolpaths) draw_ellipses();

    // resulting polygon
    rotate(extra_angle[num_inserts]*PI/180);
    fill(255,200,200);
    polygon(0,0,extra_size[num_inserts]*(centre_separation-cutter_radius),gear_ratio*num_inserts);
    fill(255);
    rotate(-extra_angle[num_inserts]*PI/180);
    rotate(-45*PI/180);
}

function draw_ellipses() {
    noFill();
    stroke(150);

    for (var i = 0; i < num_inserts; i++) {
        rotate(PI/num_inserts);
        ellipse(0,0,centre_separation*2+cutter_radius*2,centre_separation*2-2*cutter_radius-1);
    }
    if (num_inserts > 0) rotate(PI);

    fill(255);
    stroke(0);
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
