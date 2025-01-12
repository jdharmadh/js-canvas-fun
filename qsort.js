let quickSortStack = [];
let quickSortInProgress = false;

function quickSortStep() {
  if (quickSortStack.length === 0) {
    quickSortInProgress = false;
    arrSorted = true;
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

function startQuickSort() {
  populateArray();
  quickSortStack = [{ low: 0, high: arr.length - 1 }];
  quickSortInProgress = true;
  arrSorted = false;
  doneSorting = false;
  animateQuickSort();
}

function animateQuickSort() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (quickSortInProgress) {
    quickSortStep();
  }

  for (let r = 0; r < n; r++) {
    ctx.beginPath();
    if (
      quickSortInProgress &&
      (r === quickSortStack[quickSortStack.length - 1]?.low ||
        r === quickSortStack[quickSortStack.length - 1]?.high)
    ) {
      ctx.fillStyle = "red";
    } else if (arrSorted) {
      ctx.fillStyle = "green";
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

  if (!doneSorting) requestAnimationFrame(animateQuickSort);
}
