const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

boardRows = 20;
boardCols = 10;

board = new Array(boardRows);
for (let i = 0; i < boardRows; i++) {
  board[i] = new Array(boardCols);
  for (let j = 0; j < boardCols; j++) {
    board[i][j] = 0;
  }
}

function gameLoop() {}

setInterval(gameLoop, 10);
