const W = 550;
const H = 510;

function init() {
  const canvas = document.getElementById("imageView");
  context = canvas.getContext("2d");

  fractal([50, 150], [500, 150], 5);
  fractal([270, 490], [50, 150], 5);
  fractal([500, 150], [270, 490], 5);
}

function fractal(A, B, depth) {
  if (depth < 0) return null;

  const C = divide(add(multiply(A, 2), B), 3);
  const D = divide(add(multiply(B, 2), A), 3);
  const F = divide(add(A, B), 2);
  const V1 = divide(minus(F, A), length(F, A));
  const V2 = [V1[1], -V1[0]];
  const E = add(multiply(V2, Math.sqrt(3) / 6 * length(B, A)), F);

  DrawLine(A, B, "black");

  if (depth != 0) {
    for (let i = 0; i < 10; i++) DrawLine(C, D, "white");
  }

  fractal(A, C, depth - 1);
  fractal(C, E, depth - 1);
  fractal(E, D, depth - 1);
  fractal(D, B, depth - 1);
}

const multiply = (v, num) => [v[0] * num, v[1] * num];
const divide = (v, num) => [v[0] / num, v[1] / num];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const minus = (a, b) => [a[0] - b[0], a[1] - b[1]];
const length = (a, b) => Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);

function DrawLine(a, b, c) {
  context.beginPath();
  context.strokeStyle = c;
  context.moveTo(a[0], a[1]);
  context.lineTo(b[0], b[1]);
  context.stroke();
  context.closePath();
}
