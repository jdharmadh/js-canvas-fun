const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Control
tickSpeed = 20;

// Game Constants
const ballSideLength = 24;
const ballVelocity = 256;
let ballDirection = { x: 1, y: -1 };
let ballPosition = { x: canvas.width / 2, y: canvas.height / 2 };

const playerPosition = { x: 0, y: canvas.height / 2 };
const playerWidth = 24;
const playerHeight = 120;
const playerSpeed = 1500;

function draw() {
  ctx.fillStyle = "black";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(
    ballPosition.x - ballSideLength,
    ballPosition.y - ballSideLength,
    ballSideLength,
    ballSideLength
  );

  ctx.fillStyle = "cyan";
  ctx.fillRect(playerPosition.x, playerPosition.y - playerHeight/2, playerWidth, playerHeight);
}

function translateBall(seconds) {
  ballPosition.x += ballDirection.x * ballVelocity * seconds;
  ballPosition.y += ballDirection.y * ballVelocity * seconds;
}

function checkCollision() {
  if (ballPosition.x >= canvas.width || ballPosition.x - ballSideLength <= 0) {
    // hitting the right wall
    ballDirection.x *= -1;
  } else if (
    ballPosition.y >= canvas.height ||
    ballPosition.y - ballSideLength <= 0
  ) {
    // hitting the right wall
    ballDirection.y *= -1;
  }
}

document.addEventListener("mousemove", function (event) {
    const rect = canvas.getBoundingClientRect();
    let y = event.clientY - rect.top;
    if (y < playerHeight/2) y = playerHeight/2;
    if (y > canvas.height - playerHeight/2) y = canvas.height - playerHeight/2;
    playerPosition.y = y;
  });
  
setInterval(function () {
  translateBall(tickSpeed / 1000);
  checkCollision();
  draw();
}, tickSpeed);
