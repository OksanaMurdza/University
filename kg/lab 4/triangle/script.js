$(document).ready(function() {
  let ctx = document.getElementById("triangle").getContext("2d");
  let top = new Point(500 / 2, 0),
    left = new Point(0, 500),
    right = new Point(500, 500);
  drawTriangle(5, new Triangle(top, left, right), ctx);
});

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Triangle {
  constructor(top, left, right) {
    this.top = top;
    this.left = left;
    this.right = right;
  }
}

function draw(triangle, ctx) {
  setTimeout(() => {
    ctx.fillStyle = "#000000";

    ctx.beginPath();
    ctx.moveTo(triangle.top.x, triangle.top.y);
    ctx.lineTo(triangle.left.x, triangle.left.y);
    ctx.lineTo(triangle.right.x, triangle.right.y);
    ctx.closePath();

    ctx.fill();
  }, 1000);
}

function getMiddle(p1, p2) {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}

function drawTriangle(level, triangle, ctx) {
  if (level == 0) {
    draw(triangle, ctx);
    return;
  }

  let leftMid = getMiddle(triangle.top, triangle.left),
    rightMid = getMiddle(triangle.top, triangle.right),
    topMid = getMiddle(triangle.left, triangle.right);

  drawTriangle(level - 1, new Triangle(triangle.top, leftMid, rightMid), ctx);
  drawTriangle(level - 1, new Triangle(leftMid, triangle.left, topMid), ctx);
  drawTriangle(level - 1, new Triangle(rightMid, topMid, triangle.right), ctx);
}
