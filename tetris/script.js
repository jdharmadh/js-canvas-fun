const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const boardRows = 20;
const boardCols = 10;
const squareSize = canvas.width / boardCols

board = new Array(boardRows);
for (let i = 0; i < boardRows; i++) {
  board[i] = new Array(boardCols);
  for (let j = 0; j < boardCols; j++) {
    board[i][j] = 0;
  }
}

function setPiece(piece, row, col) {
  console.log(piece)
  gottenPiece = getPiece(piece);
  console.log(gottenPiece)
  for (let i = 0; i < gottenPiece.length; i++) {
    for (let j = 0; j < gottenPiece[0].length; j++) {
      board[row + i][col + j] += gottenPiece[i][j];
    }
  }
}

function drawBoard() {
  for (let i = 0; i < boardRows; i++) {
    for (let j = 0; j < boardCols; j++) {
      if (board[i][j] == 1){
        ctx.fillStyle = "orange";
        ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize)
      }
    }
  }
}

function gameLoop() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawBoard();
}

setPiece(randomPiece(), 0, 0);
setInterval(gameLoop, 10);
