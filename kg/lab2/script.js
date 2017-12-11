const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

class Bezier {
  constructor(x0, y0, x1, y1, x2, y2, x3, y3) {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.i = 0;

    // this.normalCurveBezier();
  }

  normalCurveBezier() {
    let t = 0.001;
    const AllPoint = [];

    const { x0, x1, x2, x3, y0, y1, y2, y3 } = this;

    while (t <= 1) {
      let q1 = t ** 3 * -1 + t ** 2 * 3 + t * -3 + 1;
      let q2 = t ** 3 * 3 + t ** 2 * -6 + t * 3;
      let q3 = t ** 3 * -3 + t ** 2 * 3;
      let q4 = t ** 3;
      let qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3;
      let qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3;

      t += 0.001;

      AllPoint.push({
        qx,
        qy
      });
    }

    this.drawPoint(AllPoint);
  }

  Rotation() {
    let t = 0.001;
    const AllPoint = [];
    let i = 1;
    const { x0, x1, x2, x3, y0, y1, y2, y3 } = this;

    while (t <= 1) {
      let q1 = t ** 3 * -1 + t ** 2 * 3 + t * -3 + 1;
      let q2 = t ** 3 * 3 + t ** 2 * -6 + t * 3;
      let q3 = t ** 3 * -3 + t ** 2 * 3;
      let q4 = t ** 3;
      let qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3;
      let qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3;
      let newX = 1 + (qx * Math.cos(12 * i) - qy * Math.sin(10 * i));
      let newY = 1 + (qx * Math.sin(12 * i) + qy * Math.cos(10 * i));
      t += 0.001;
      console.log({ newX, newY });
      AllPoint.push({
        newX,
        newY
      });
    }

    this.drawPoint(AllPoint);
  }

  drawPoint(pointArray) {
    context.beginPath();

    pointArray.reduce((acc, item) => {
      const { qx: startX, qy: startY } = acc;
      const { qx: finishX, qy: finishY } = item;

      context.moveTo(startX, startY);
      context.lineTo(finishX, finishY);

      return item;
    });

    context.stroke();
  }

  showInfo() {
    console.log(this);
  }
}

class UI {
  constructor() {
    this.canvas = canvas;
    this.newPointArray = [];
  }

  getMousePosition(e) {
    const { canvas } = this;

    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  savePoint(x, y) {
    const { newPointArray } = this;

    if (newPointArray.length < 8) {
      newPointArray.push(x, y);
    } else return true;
  }

  getPoint() {
    const { newPointArray } = this;

    return newPointArray;
  }
}

const screenUI = new UI(canvas);
let hack;

canvas.addEventListener("click", e => {
  const { x, y } = screenUI.getMousePosition(e);
  console.log({ x, y });
  const res = screenUI.savePoint(x, y);

  if (res) {
    const pointArray = screenUI.getPoint();
    const NewBezier = new Bezier(...pointArray);
    // NewBezier.normalCurveBezier();
    hack = NewBezier;
    hack.Rotation();
  } else context.fillRect(x, y, 1, 1);
});

function uiHandler(props) {
  switch (props) {
    case "Turn around":
      hack.Rotation();
      break;

    default:
      break;
  }
}
