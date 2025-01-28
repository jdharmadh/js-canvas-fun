const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Control
tickSpeed = 15;

// Game Constants
const ballSideLength = 25;
const ballVelocity = 7;
let ballDirection = { x: 1, y: -1 };
let ballPosition = { x: canvas.width / 2, y: canvas.height / 2 };

function drawBall() {
  ctx.fillStyle = "white";
  ctx.fillRect(ballPosition.x - ballSideLength, ballPosition.y - ballSideLength, ballSideLength, ballSideLength);
}

function translateBall(seconds) {
    ballPosition.x += ballDirection.x * ballVelocity;
    ballPosition.y += ballDirection.y * ballVelocity;
}



function checkCollision() {
    if (ballPosition.x >= canvas.width || ballPosition.x - ballSideLength <= 0){
        // hitting the right wall
        ballDirection.x *= -1;
    } else if (ballPosition.y >= canvas.height || ballPosition.y - ballSideLength <= 0){
        // hitting the right wall
        ballDirection.y *= -1;
    }
}


setInterval(function() {
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    translateBall(tickSpeed/1000);
    checkCollision();
    drawBall();
}, tickSpeed);