const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Animation example
let x = 0;
let n = 100;
// make a random array of n integers from 0 to 200 representing the heights of the bars
let arr = [];
for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 400));
}
console.log(arr);
function animate() {
    // Make the canvas light gray
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        // change the fill style to some random color
        if (i == x) {
            ctx.fillStyle = 'red';
        } 
        else {
            ctx.fillStyle = 'blue';
        }
        ctx.rect(i * canvas.width / n, canvas.height - arr[i], canvas.width / n, arr[i]);
        ctx.fill();
    }
    
    x += 2;
    if (x >= n) x = 0;
    requestAnimationFrame(animate);  // Loop the animation
}
animate();
