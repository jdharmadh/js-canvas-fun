const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const boardRows = 25; // 4 for above, one for below
const visibleBoardRows = 20;
const boardCols = 12;
const visibleboardCols = 10;
const squareSize = canvas.width / visibleboardCols;

currentPiece = { piece: randomPiece(), row: 0, col: 2 };

board = new Array(boardRows);
for (let i = 0; i < boardRows; i++) {
  board[i] = new Array(boardCols);
  for (let j = 0; j < boardCols; j++) {
    if (i === boardRows - 1 || j == 0 || j == boardCols - 1) board[i][j] = 1;
    else board[i][j] = 0;
  }
}

function setPiece(piece, row, col, num) {
  gottenPiece = getPiece(piece);
  for (let i = 0; i < gottenPiece.length; i++) {
    for (let j = 0; j < gottenPiece[0].length; j++) {
      if (row + i < boardRows && col + j >= 0 && col + j < boardCols)
        board[row + i][col + j] += num * gottenPiece[i][j];
    }
  }
}

function drawBoard() {
  for (let i = 4; i < boardRows - 1; i++) {
    for (let j = 1; j < boardCols - 1; j++) {
      if (board[i][j] == 1) {
        ctx.fillStyle = "orange";
        ctx.fillRect(
          (j - 1) * squareSize,
          (i - 4) * squareSize,
          squareSize,
          squareSize
        );
      }
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    setPiece(currentPiece.piece, currentPiece.row, currentPiece.col - 1, 1);
    let wasCollision = existsCollision();
    setPiece(currentPiece.piece, currentPiece.row, currentPiece.col - 1, -1);
    if (!wasCollision) {
      currentPiece.col -= 1;
    }
  } else if (event.key === "ArrowRight") {
    setPiece(currentPiece.piece, currentPiece.row, currentPiece.col + 1, 1);
    let wasCollision = existsCollision();
    setPiece(currentPiece.piece, currentPiece.row, currentPiece.col + 1, -1);
    if (!wasCollision) {
      currentPiece.col += 1;
    }
  } else if (event.key === "ArrowUp") {
    currentPiece.piece = rotatePiece(currentPiece.piece);
    setPiece(currentPiece.piece, currentPiece.row, currentPiece.col, 1);
    let wasCollision = existsCollision();
    setPiece(currentPiece.piece, currentPiece.row, currentPiece.col, -1);
    currentPiece.piece = unRotatePiece(currentPiece.piece);
    if (!wasCollision) {
      currentPiece.piece = rotatePiece(currentPiece.piece);
    }
  }
});

function dropPiece() {
  for (let i = 4; i < boardRows - 1; i++) {
    colGood = true;
    for (let j = 1; j < boardCols - 1; j++) {
      if (board[i][j] == 0) colGood = false;
    }
    if (colGood){
        for (let k = i; k > 4; k--) {
            for (let j = 1; j < boardCols - 1; j++) {
                board[k][j] = board[k - 1][j];
            }
        }
    }
  }
  setPiece(currentPiece.piece, currentPiece.row + 1, currentPiece.col, 1);
  let wasCollision = existsCollision();
  setPiece(currentPiece.piece, currentPiece.row + 1, currentPiece.col, -1);
  if (!wasCollision) {
    currentPiece.row += 1;
  } else {
    setPiece(currentPiece.piece, currentPiece.row, currentPiece.col, 1);
    currentPiece = {
      piece: randomPiece(),
      row: 0,
      col: Math.floor(boardCols / 2) - 1,
    };
  }
}

function existsCollision() {
  console.log(board);
  for (let i = 0; i < boardRows; i++) {
    for (let j = 0; j < boardCols; j++) {
      if (board[i][j] > 1) {
        console.log("collision!");
        return true;
      }
    }
  }
  return false;
}

function gameLoop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  setPiece(currentPiece.piece, currentPiece.row, currentPiece.col, 1);
  drawBoard();
  setPiece(currentPiece.piece, currentPiece.row, currentPiece.col, -1);
}

setInterval(gameLoop, 100);
setInterval(dropPiece, 100);
