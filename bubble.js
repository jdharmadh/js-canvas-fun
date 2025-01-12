let i = 0;
let j = 0;

function startBubbleSort() {
  populateArray();
  doneSorting = false;
  arrSorted = false;
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
  // Make the canvas light gray
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let k = 0; k < 5; k++) {
    bubbleSortStep();
  }
  if (!arrSorted) {
    arrSorted = isSorted(arr);
    doneSorting = arrSorted;
  }
  for (let r = 0; r < n; r++) {
    ctx.beginPath();
    // change the fill style to some random color
    if (r == j) {
      if (arrSorted) {
        // play the finishing animation
        doneSorting = true;
        ctx.fillStyle = "green";
        bubbleSpeed = 1;
      } else {
        ctx.fillStyle = "red";
      }
    } else {
      ctx.fillStyle = "white";
    }
    ctx.rect(
      (r * canvas.width) / n,
      canvas.height - arr[r],
      canvas.width / n,
      arr[r] - 6
    );
    ctx.fill();
  }

  if (!doneSorting) requestAnimationFrame(animateBubbleSort); // Loop the animation
}
