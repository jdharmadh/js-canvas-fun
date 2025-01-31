const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const dinoGravity = -18;
const tickSpeed = 20;

const dinoWidth = 20;
const dinoHeight = 80;
const dinoX = 60;
dinoY = canvas.height - dinoHeight;
dinoYVelocity = 0;

hasLost = false;

obstacles = [];

function getRandomObstacle() {
  return {
    x: canvas.width,
    y: canvas.height - 40,
    width: 40,
    height: 40,
    speed: 300,
  };
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);

  ctx.fillStyle = "orange";
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillRect(
      obstacles[i].x,
      obstacles[i].y,
      obstacles[i].width,
      obstacles[i].height
    );
  }

  if (hasLost) {
    console.log("You lost!");
    const despairImage = new Image();
    despairImage.src = "./despair.png";
    despairImage.onload = function () {
      ctx.drawImage(
        despairImage,
        canvas.width / 2 - 50,
        canvas.height / 2 - 50,
        100,
        100
      );
    };
  }
}

function update(ms) {
  dinoY -= (dinoYVelocity * ms) / 1000;
  dinoYVelocity += dinoGravity;
  if (dinoY > canvas.height - dinoHeight) {
    dinoY = canvas.height - dinoHeight;
    dinoYVelocity = 0;
  }
  if (obstacles.length === 0) {
    obstacles.push(getRandomObstacle());
  }
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacles[i].speed * (ms / 1000);
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
    }

    if (
      dinoX < obstacles[i].x + obstacles[i].width &&
      dinoX + dinoWidth > obstacles[i].x &&
      dinoY < obstacles[i].y + obstacles[i].height &&
      dinoY + dinoHeight > obstacles[i].y
    ) {
      hasLost = true;
      draw();
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp") {
    if (dinoY === canvas.height - dinoHeight) dinoYVelocity = 400;
  } else if (event.code === "Space") {
    if (hasLost) {
      dinoY = canvas.height - dinoHeight;
      dinoYVelocity = 0;
      hasLost = false;
      obstacles = [];
    }
  }
});

setInterval(function () {
  if (hasLost) return;
  update(tickSpeed);
  draw();
}, tickSpeed);
