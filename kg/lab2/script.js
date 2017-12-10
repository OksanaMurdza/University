const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

// const points = [];

// let t = 0.001;

const [x0, y0, x1, y1, x2, y2, x3, y3] = [10, 80, 40, 10, 80, 10, 140, 80];

// while( t <= 1 ) {
// 	let q1 = t * t * t * (- 1) + t * t * 3 + t * (-3) + 1;
// 	let q2 = t * t * t * 3 + t * t * (-6) + t * 3
//     let q3 = t * t * t * (-3) + t * t * 3
//     let q4 = t * t * t
//     let qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
//     let qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
//     t += 0.001

//     points.push({qx, qy});
// }

// drawPoint(points);


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
    }

    takePointСoordinates() {
        const t = 0.001;

        // DESTUCT
        // const {}

        while (t <= 1) {
            let q1 = t * t * t * (-1) + t * t * 3 + t * (-3) + 1;
            let q2 = t * t * t * 3 + t * t * (-6) + t * 3
            let q3 = t * t * t * (-3) + t * t * 3
            let q4 = t * t * t
            let qx = q1 * x0 + q2 * x1 + q3 * x2 + q4 * x3
            let qy = q1 * y0 + q2 * y1 + q3 * y2 + q4 * y3
            t += 0.001

            this.AllPoint.push({
                qx,
                qy
            });
        }
    }

    drawPoint() {
        context.beginPath();

        points.reduce((acc, item) => {
            const {
                qx: startX,
                qy: startY
            } = acc;
            const {
                qx: finishX,
                qy: finishY
            } = item;

            context.moveTo(startX, startY);
            context.lineTo(finishX, finishY);

            return item
        })

        context.stroke();
    }

    showInfo() {
        console.log(this);
    }

}

const NewBezier = new Bezier(10, 80, 40, 10, 80, 10, 140, 80);

NewBezier.show();