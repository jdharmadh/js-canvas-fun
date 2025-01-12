const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Animation example
let x = 0;
let n = 100;
let i = 0;
let j = 0;
let bubbleSpeed = 10;
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

    for (let r = 0; r < n; r++) {
        ctx.beginPath();
        // change the fill style to some random color
        if (r == j) {
            ctx.fillStyle = 'red';
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
    if (j >= n - i - 1) {
        i += 1;
        j = 0;
    }
    if (i >= n){
        i = 0;
    }
}

// make a function called bubble
// function bubble(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 let temp = arr[j];
//                 arr[j] = arr[j + 1];
//                 arr[j + 1] = temp;
//             }
//         }
//     }
// }