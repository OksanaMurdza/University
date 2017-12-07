function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};


function draw() {
  context.beginPath();

  const [firstPoint] = pointArray;
  const lastPoint = pointArray[pointArray.length - 1];

  pointArray.reduce((acc, item) => {
    const { x: startX, y: startY } = acc;
    const { x: finishX, y: finishY } = item;

    context.moveTo(startX, startY);
    context.lineTo(finishX, finishY);


    return item
  });

  context.moveTo(firstPoint.x, firstPoint.y);
  context.lineTo(lastPoint.x, lastPoint.y);

  context.stroke();

  fillType === 0 ? fill() : setTimeout(lazyDraw, 4000);
};

function lazyDraw() {
  context.fillStyle = '#000';
  context.beginPath();
  const { minPoint, maxPoint } = sortPoint();

  context.moveTo(minPoint.x, minPoint.y);

  pointArray.map(item => {
    const { x, y } = item;
    context.lineTo(x, y);
  });

  context.closePath();
  context.fill();
};


function sortPoint() {
  const minX = pointArray.reduce((acc, item) => {
    const { x: accX } = acc;
    const { x: itemX } = item;

    return itemX < accX ? item : acc;
  })

  const maxX = pointArray.reduce((acc, item) => {
    const { x: accX } = acc;
    const { x: itemX } = item;

    return itemX > accX ? item : acc;
  })

  const minY = pointArray.reduce((acc, item) => {
    const { y: accY } = acc;
    const { y: itemY } = item;

    if (itemY < accY) return item
    else return acc

    return itemY < accY ? item : acc;
  })

  const maxY = pointArray.reduce((acc, item) => {
    const { y: accY } = acc;
    const { y: itemY } = item;

    return itemY > accY ? item : acc;
  })

  const minPoint = { x: minX.x, y: minY.y };
  const maxPoint = { x: maxX.x, y: maxY.y };

  return { minPoint, maxPoint };
};


function fill() {
  const { minPoint, maxPoint } = sortPoint();
  context.beginPath();

  for (let y = minPoint.y; y < maxPoint.y; y++) {
    let start = 0, finish = 0;
    for (let j = minPoint.x; j <= maxPoint.x; j++) {
      const pixel = context.getImageData(j, y, 1, 1);
      const rubicon = (maxPoint.x - minPoint.x) / 2;
      const { data } = pixel;

      if (data[3] > 0 && start == 0)
        start = j;
      if (j > rubicon && data[3] > 0)
        finish = j;

    }

    context.moveTo(start, y);
    context.lineTo(finish, y);
  }

  context.stroke();
};

const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

const pointArray = [];
let fillType = 0;


canvas.addEventListener('click', e => {
  if (pointArray.length < 4) {
    const { x, y } = getMousePos(canvas, e);

    context.fillRect(x, y, 1, 1);
    pointArray.push({ x: x, y: y });

    if (pointArray.length === 4)
      draw()
  }

});


function save() {
  const radio = document.getElementsByName('type');

  Object.values(radio).map((item, index) => item.checked ? fillType = index : null);
}
