const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Animation example
let x = 0;
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas
    ctx.beginPath();
    ctx.arc(x, canvas.height / 2, 30, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    x += 1;
    if (x > canvas.width) x = 0;
    requestAnimationFrame(animate);  // Loop the animation
}
animate();
