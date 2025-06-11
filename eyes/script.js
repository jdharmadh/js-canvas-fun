const stage = new Konva.Stage({
  container: "container",
  width: window.innerWidth,
  height: window.innerHeight,
});

const centerX1 = stage.width() / 2 - 30;
const centerY1 = stage.height() / 2;

const centerX2 = stage.width() / 2 + 30;
const centerY2 = stage.height() / 2;

const layer = new Konva.Layer();
stage.add(layer);

const circle = new Konva.Circle({
  x: centerX1,
  y: centerY1,
  radius: 25,
  fill: "white",
  stroke: "black",
  strokeWidth: 2,
});

const circle2 = new Konva.Circle({
  x: centerX1,
  y: centerY1,
  radius: 10,
  fill: "brown",
  strokeWidth: 2,
  draggable: true,
});

const circle3 = new Konva.Circle({
  x: centerX2,
  y: centerY2,
  radius: 25,
  fill: "white",
  stroke: "black",
  strokeWidth: 2,
});

const circle4 = new Konva.Circle({
  x: centerX2,
  y: centerY2,
  radius: 10,
  fill: "brown",
  strokeWidth: 2,
  draggable: true,
});

const arc = new Konva.Arc({
  x: stage.width() / 2,
  y: stage.height() / 2 + 50,
  innerRadius: 10,
  outerRadius: 13,
  angle: 180,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4
});

stage.on("pointermove", function () {
  const pos = stage.getPointerPosition();
  const x1Vec = pos.x - centerX1;
  const y1Vec = pos.y - centerY1;
    const x2Vec = pos.x - centerX2;
    const y2Vec = pos.y - centerY2;
  circle2.x(centerX1 + (x1Vec * 15 / Math.sqrt(x1Vec * x1Vec + y1Vec * y1Vec)))
  circle2.y(centerY1 + (y1Vec * 15 / Math.sqrt(x1Vec * x1Vec + y1Vec * y1Vec)))
    circle4.x(centerX2 + (x2Vec * 15 / Math.sqrt(x2Vec * x2Vec + y2Vec * y2Vec)))
    circle4.y(centerY2 + (y2Vec * 15 / Math.sqrt(x2Vec * x2Vec + y2Vec * y2Vec)))
});

stage.on("click", function () {
    const pos = stage.getPointerPosition();
    const square = new Konva.Rect({
      x: pos.x - 10,
      y: pos.y - 10,
      width: 20,
      height: 20,
      fill: "red",
      stroke: "black",
      strokeWidth: 2,
    });
    square.on("click", function (e) {
      e.cancelBubble = true; // prevent event bubbling
    });
    square.on("click", function () {
      // delete the square
        square.destroy();
    });
    layer.add(square);
});



layer.add(circle);
layer.add(circle2);
layer.add(circle3);
layer.add(circle4);
layer.add(arc);