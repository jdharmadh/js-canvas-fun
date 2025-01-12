const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const button = document.getElementById('button');

// Animation example
let x = 0;
let n = 100;
let i = 0;
let j = 0;
let bubbleSpeed = 10;
let arrSorted = false;
// make a random array of n integers from 0 to 200 representing the heights of the bars
let arr = [];
for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 400));
}
console.log(arr);
function animate() {

    // Make the canvas light gray
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let k = 0; k < bubbleSpeed; k++) {
         bubbleUpdate();
    }
    if (!arrSorted) {
        arrSorted = isSorted(arr);
    }
    for (let r = 0; r < n; r++) {
        ctx.beginPath();
        // change the fill style to some random color
        if (r == j) {
           if (arrSorted) {
               ctx.fillStyle = 'green';
               bubbleSpeed = 1;
           }
            else {
                ctx.fillStyle = 'red';
            }
        } 
        else {
            ctx.fillStyle = 'white';
        }
        ctx.rect(r * canvas.width / n, canvas.height - arr[r], canvas.width / n, arr[r] - 6);
        ctx.fill();
    }
    
    requestAnimationFrame(animate);  // Loop the animation
}
animate();

function bubbleUpdate() {
    if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
    }

    j += 1;
    if (j >= n - i - 1 && !arrSorted) {
        i += 1;
        j = 0;
    }
    if (i >= n) {
        i = 0;
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

function resetSort(){
    arrSorted = false;
    for (let i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * 400);
    }
    i = 0;
    j = 0;
    bubbleSpeed = 10;
}