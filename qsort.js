let quickSortStack = [];
let quickSortInProgress = false;

function startQuickSort() {
  switch (sortSpeed) {
    case "slow":
      n = 500;
      break;
    case "medium":
      n = 250;
      break;
    case "fast":
      n = 100;
      break;
  }
  populateArray();
  quickSortStack = [{ low: 0, high: arr.length - 1 }];
  quickSortInProgress = true;
  doneSorting = false;
  animateQuickSort();
}

function quickSortStep() {
  if (quickSortStack.length === 0) {
    quickSortInProgress = false;
    doneSorting = true;
    return;
  }

  let { low, high, pivotIndex } = quickSortStack.pop();

  if (low < high) {
    pivotIndex = partition(arr, low, high);
    quickSortStack.push({ low: pivotIndex + 1, high: high });
    quickSortStack.push({ low: low, high: pivotIndex - 1 });
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function animateQuickSort() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (!isSorted(arr)) {
    quickSortStep();
  } else {
    doneSorting = true;
    doneSortingAnimation();
    return;
  }

  for (let i = 0; i < n; i++) {
    ctx.beginPath();
    if (
      quickSortInProgress &&
      (i === quickSortStack[quickSortStack.length - 1]?.low ||
        i === quickSortStack[quickSortStack.length - 1]?.high)
    ) {
      ctx.fillStyle = "red";
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

  if (!doneSorting) requestAnimationFrame(animateQuickSort);
}
