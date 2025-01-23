const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let isMouseDown = false;
let isPlaying = false;
let tick = 100;

canvas.addEventListener("mousedown", function (e) {
  isMouseDown = true;
  handleMouseDown(canvas, e);
});

canvas.addEventListener("mouseup", function (e) {
  isMouseDown = false;
});

canvas.addEventListener("mousemove", function (evt) {
  if (isMouseDown) {
    handleMouseDown(canvas, evt);
  }
});

const cellRows = 36;
const cellCols = 48;
let cellWidth = canvas.width / cellCols;
let cellHeight = canvas.height / cellRows;
let cells = new Array(cellRows);
for (let i = 0; i < cellRows; i++) {
  cells[i] = new Array(cellCols);
  for (let j = 0; j < cellCols; j++) {
    cells[i][j] = 0;
  }
}

anim();
function anim() {
  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < cellRows; i++) {
    for (let j = 0; j < cellCols; j++) {
      ctx.fillStyle = blackOrWhiteColorString(cells[i][j]);
      ctx.fillRect(
        j * cellWidth,
        i * cellHeight,
        cellWidth - 1,
        cellHeight - 1
      );
    }
  }
  requestAnimationFrame(anim);
}

function blackOrWhiteColorString(x) {
  if (x == 0) {
    return "white";
  } else {
    return "black";
  }
}

function handleMouseDown(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const row = Math.floor(y / cellHeight);
  const col = Math.floor(x / cellWidth);
  cells[row][col] = 1;
}

function startAnimation() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    startGame();
  }
}

function startGame() {
  if (!isPlaying) {
    return;
  }

  let newCells = new Array(cellRows);
  for (let i = 0; i < cellRows; i++) {
    newCells[i] = new Array(cellCols);
    for (let j = 0; j < cellCols; j++) {
      newCells[i][j] = 0;
    }
  }
  for (let i = 0; i < cellRows; i++) {
    for (let j = 0; j < cellCols; j++) {
      let count = 0;
      for (let k = -1; k <= 1; k++) {
        for (let l = -1; l <= 1; l++) {
          if (
            i + k >= 0 &&
            i + k < cellRows &&
            j + l >= 0 &&
            j + l < cellCols
          ) {
            count += cells[i + k][j + l];
          }
        }
      }
      if (cells[i][j]) {
        count--;
        if (count == 2 || count == 3) {
          newCells[i][j] = 1;
        }
      } else {
        if (count == 3) {
          newCells[i][j] = 1;
        }
      }
    }
  }
  cells = newCells;
  setTimeout(startGame, tick);
}

function clearCells() {
  for (let i = 0; i < cellRows; i++) {
    for (let j = 0; j < cellCols; j++) {
      cells[i][j] = 0;
    }
  }
  isPlaying = false;
}

function updateSpeed(x) {
  tick = (10 - x) * 50;
}
