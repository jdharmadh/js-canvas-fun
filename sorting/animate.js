const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("button");

let n = 30;
let arr = [];
let sortSpeed = "medium";
let doneSorting = true;
doneSortingAnimationIndex = 0;

function updateSortSpeed(speed) {
  sortSpeed = speed;
}

function populateArray() {
  arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * canvas.height));
  }
}

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

function draw() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(
      (i * canvas.width) / n,
      canvas.height - arr[i],
      canvas.width / n,
      arr[i]
    );
    ctx.fill();
  }
}

function doneSortingAnimation() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    if (doneSortingAnimationIndex == i) {
      ctx.fillStyle = "green";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.rect(
      (i * canvas.width) / n,
      canvas.height - arr[i],
      canvas.width / n,
      arr[i]
    );
    ctx.fill();
  }
  doneSortingAnimationIndex += Math.floor(n / 50) + 1;
  if (doneSortingAnimationIndex >= n) {
    doneSortingAnimationIndex = 0;
    doneSorting = false;
  }
  if (doneSorting) requestAnimationFrame(doneSortingAnimation);
}

populateArray();
draw();
