var config = {
  apiKey: "AIxaSyGsAkHke9lXEU_97a8rYpMn7gOH3eWDxrM",
  authDomain: "collaborative-sketch.firebaseapp.com",
  databaseURL: "https://collaborative-sketch.firebaseio.com",
  storageBucket: "collaborative-sketch.appspot.com",
};
firebase.initializeApp(config);

var pointsData = firebase.database().ref();
var points = [];

function setup() {
  var canvas = createCanvas(1000,1000);
  createCanvas(1000, 1000);
  background(255);
  fill(0);
  
  pointsData.on("child_added", function (point) {
    points.push(point.val());
  });
  pointsData.on("child_removed", function () {
    points = [];
  });

  canvas.mousePressed(drawPoint);
  canvas.mouseMoved(drawPointIfMousePressed);
}

function drawPointIfMousePressed() {
  if (mouseIsPressed) {
    drawPoint();
  }
}

function draw() {
  background(255);

  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    ellipse(point.x, point.y, 5, 5);
  }
}


function drawPoint() {
  pointsData.push({x: mouseX, y: mouseY});
}

$("#saveDrawing").on("click", saveDrawing);

function saveDrawing() {
    saveCanvas();
}

$("#clearDrawing").on("click", clearDrawing);

function clearDrawing() {
    pointsData.remove();
    points = [];
}