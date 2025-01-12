const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const button = document.getElementById("button");

let n = 50;

let arrSorted = false;
let doneSorting = true;

let arr = [];

function populateArray() {
  arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * canvas.height - 10));
  }
}
populateArray();

function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}
