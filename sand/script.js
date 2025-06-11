const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

width = canvas.width;
height = canvas.height;
pixelSize = 5;
const ROWS = height / pixelSize;
const COLS = width / pixelSize;

const BLACK = "hsl(0, 0%, 0%)";
hsl = 0;

function reset() {
  cells = new Array(ROWS);
  for (let i = 0; i < ROWS; i++) {
    cells[i] = new Array(COLS);
    for (let j = 0; j < COLS; j++) {
      cells[i][j] = { color: BLACK };
    }
  }
}

function updateGrid() {
  // check the falling
  for (let i = ROWS - 2; i >= 0; i--) {
    for (let j = COLS - 1; j >= 0; j--) {
      if (cells[i][j].color != BLACK && cells[i + 1][j].color == BLACK) {
        cells[i + 1][j].color = cells[i][j].color;
        cells[i][j].color = BLACK;
      }
    }
  }

  // check for peaks
  for (let j = 0; j < COLS; j++) {
    for (let i = ROWS - 3; i >= 0; i--) {
      if (
        cells[i][j].color != BLACK &&
        cells[i + 1][j].color != BLACK &&
        cells[i + 2][j].color != BLACK &&
        ((j - 1 >= 0 && cells[i + 1][j - 1].color == BLACK) ||
          (j + 1 < COLS && cells[i + 1][j + 1].color == BLACK))
      ) {
        if (j - 1 >= 0 && cells[i + 1][j - 1].color == BLACK) {
          cells[i + 1][j - 1].color = cells[i][j].color;
          cells[i][j].color = BLACK;
        } else if (j + 1 < COLS && cells[i + 1][j + 1].color == BLACK) {
          cells[i + 1][j + 1].color = cells[i][j].color;
          cells[i][j].color = BLACK;
        }
      }
    }
  }
  drawGrid();
}

function drawGrid() {
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const coin = Math.random() < 0.5 ? true : false;
      ctx.fillStyle = cells[i][j].color;
      ctx.fillRect(j * pixelSize, i * pixelSize, pixelSize, pixelSize);
      ctx.fillStyle = BLACK;
    }
  }
}

let isMouseDown = false;

canvas.addEventListener("mousedown", function (event) {
  isMouseDown = true;
  handleMouse(event);
});

canvas.addEventListener("mouseup", function () {
  isMouseDown = false;
});

canvas.addEventListener("mousemove", function (event) {
  if (isMouseDown) {
    handleMouse(event);
  }
});

function handleMouse(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const row = Math.floor(y / pixelSize);
  const col = Math.floor(x / pixelSize);
  hsl = (hsl + 2) % 360;
  createCell(row, col)
  createCell(row - 1, col);
    createCell(row + 1, col);
    createCell(row, col - 1);
    createCell(row, col + 1);
    createCell(row - 1, col - 1);
    createCell(row - 1, col + 1);
    createCell(row + 1, col - 1);
    createCell(row + 1, col + 1);
    drawGrid();
  
}

function createCell(row, col) {
    if (
    row >= 0 &&
    row < cells.length &&
    col >= 0 &&
    col < cells[0].length &&
    cells[row][col].color == BLACK
  ) {
    cells[row][col].color = "hsl(" + hsl + ", 98%, 50%)";
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    reset();
    drawGrid();
  }
});

reset();
setInterval(updateGrid, 10);
