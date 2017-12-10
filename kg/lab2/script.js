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
    this.AllPoint = [];

    this.normalCurveBezier();
  }

  normalCurveBezier() {
    let t = 0.001;

    const { x0, x1, x2, x3, y0, y1, y2, y3, AllPoint } = this;

    while (t <= 1) {
      let q1 = t * t * t * -1 + t * t * 3 + t * -3 + 1;
      let q2 = t * t * t * 3 + t * t * -6 + t * 3;
      let q3 = t * t * t * -3 + t * t * 3;
      let q4 = t * t * t;
      let qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3;
      let qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3;
      t += 0.001;

      AllPoint.push({
        qx,
        qy
      });

      this.drawPoint(AllPoint);
    }
  }

  drawPoint() {
    context.beginPath();

    this.AllPoint.reduce((acc, item) => {
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

canvas.addEventListener("click", e => {
  const { x, y } = screenUI.getMousePosition(e);

  const res = screenUI.savePoint(x, y);

  if (res) {
    const pointArray = screenUI.getPoint();
    const NewBezier = new Bezier(...pointArray);
  }
});
