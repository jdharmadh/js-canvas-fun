const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const dinosaurImage = new Image();
dinosaurImage.src = "./dino.webp";
const cactusImage = new Image();
cactusImage.src = "./cactus3.webp";

// Game State
const tickSpeed = 20;
const dinoGravity = -18;
const dinoWidth = 80;
const dinoHeight = 80;
const dinoX = 60;
dinoY = canvas.height - dinoHeight;
dinoYVelocity = 0;
hasLost = false;
obstacles = [];
score = 0;

// NN state
const net = new brain.NeuralNetwork({ hiddenLayers: [4, 4] });
let trainingData = [];
let currentJump = null;
iterations = 0;

function draw() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(dinosaurImage, dinoX, dinoY, dinoWidth, dinoHeight);

  ctx.fillStyle = "orange";
  for (let i = 0; i < obstacles.length; i++) {
    ctx.drawImage(
      cactusImage,
      obstacles[i].x,
      obstacles[i].y,
      obstacles[i].width,
      obstacles[i].height
    );
  }

  ctx.font = "30px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, 10, 30);
  if (obstacles.length > 0)
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
  dinoYVelocity += dinoGravity * 2;
  if (dinoY > canvas.height - dinoHeight) {
    dinoY = canvas.height - dinoHeight;
    dinoYVelocity = 0;
    if (currentJump && (obstacles.length == 0 || obstacles[0].x < dinoX)) {
      currentJump.output = { jump: 1 };
      trainingData.push(currentJump);
      currentJump = null;
    }
  }
  if (obstacles.length === 0) {
    obstacles.push(getRandomObstacle());
  }
  speed = 350;
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= speed * (ms / 1000);
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
    }

    if (
      obstacles[i] &&
      dinoX < obstacles[i].x + obstacles[i].width &&
      dinoX + dinoWidth > obstacles[i].x &&
      dinoY < obstacles[i].y + obstacles[i].height &&
      dinoY + dinoHeight > obstacles[i].y
    ) {
      hasLost = true;
      if (currentJump) {
        currentJump.output = { jump: 0 };
        trainingData.push(currentJump);
        currentJump = null;
      } else {
        trainingData.push({
          input: { distance: (obstacles[0].x - dinoX - 100) / canvas.width },
          output: { jump: 1 },
        });
        currentJump = null;
      }
      restart();
      return;
    }
  }
  if (
    dinoYVelocity === 0 &&
    obstacles.length > 0 &&
    Math.floor(obstacles[0].x % 50) === 0
  ) {
    trainingData.push({
      input: { distance: (obstacles[0].x - dinoX) / canvas.width },
      output: { jump: 0 },
    });
  }
  if (
    dinoYVelocity === 0 &&
    obstacles.length > 0 &&
    shouldJump(obstacles[0].x - dinoX) === 1
  ) {
    jump();
  }
}

function shouldJump(distance) {
  if (iterations < 2) return Math.random() > 0.8 ? 1 : 0;
  const normalizedDistance = distance / canvas.width;
  const result = net.run({ distance: normalizedDistance });
  return result.jump > 0.5 ? 1 : 0;
}

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowUp") {
    jump();
  } else if (event.code === "Space") {
    restart();
  }
});

function getRandomObstacle() {
  return {
    x: canvas.width + Math.random() * 100,
    y: canvas.height - 40,
    width: 40,
    height: 40,
  };
}

function jump() {
  if (dinoY === canvas.height - dinoHeight) {
    dinoYVelocity = 400;
    currentJump = {
      input: { distance: (obstacles[0].x - dinoX) / canvas.width },
    };
  }
}

function restart() {
  obstacles = [];
  iterations++;

  net.train(trainingData, { iterations: 10000, errorThresh: 0.005 });
  trainingData = [];

  dinoY = canvas.height - dinoHeight;
  dinoYVelocity = 0;
  score = 0;
  hasLost = false;
}

setInterval(function () {
  if (hasLost) return;
  update(tickSpeed * 2);
  draw();
}, tickSpeed);

setInterval(function () {
  if (hasLost) return;
  if (Math.random() > 0.5) obstacles.push(getRandomObstacle());
}, 2000);
