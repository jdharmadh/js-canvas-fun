const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const squareSize = 50;
const x = (canvas.width - squareSize) / 2;
const y = (canvas.height - squareSize) / 2;

ctx.fillStyle = 'red';
ctx.fillRect(x, y, squareSize, squareSize);