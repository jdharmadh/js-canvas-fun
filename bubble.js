let i = 0;
let j = 0;

function startBubbleSort() {
  switch (sortSpeed) {
    case "slow":
      n = 100;
      break;
    case "medium":
      n = 75;
      break;
    case "fast":
      n = 50;
      break;
  }
  populateArray();
  doneSorting = false;
  for (let i = 0; i < n; i++) {
    arr[i] = Math.floor(Math.random() * 400);
  }
  i = 0;
  j = 0;
  bubbleSpeed = 10;
  animateBubbleSort();
}

function bubbleSortStep() {
  if (arr[j] > arr[j + 1]) {
    let temp = arr[j];
    arr[j] = arr[j + 1];
    arr[j + 1] = temp;
  }

  j += 1;
  if (j >= n - i - 1) {
    i += 1;
    j = 0;
  }
  if (i >= n) {
    i = 0;
  }
}

function animateBubbleSort() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!isSorted(arr)) {
    for (let k = 0; k < 5; k++) {
      bubbleSortStep();
    }
  } else {
    doneSorting = true;
    console.log("done");
    doneSortingAnimation();
    return;
  }
  for (let r = 0; r < n; r++) {
    ctx.beginPath();
    if (r == j) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "white";
    }
    ctx.rect(
      (r * canvas.width) / n,
      canvas.height - arr[r],
      canvas.width / n,
      arr[r]
    );
    ctx.fill();
  }

  if (!doneSorting) requestAnimationFrame(animateBubbleSort); // Loop the animation
}
