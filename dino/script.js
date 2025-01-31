const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dinoGravity = -10;
const tickSpeed = 20;

const dinoWidth = 20;
const dinoHeight = 80;
const dinoX = 20;
dinoY = canvas.height - dinoHeight;
dinoYVelocity = 0;



function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'red';
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);
}

function update(ms) {
    dinoY -= dinoYVelocity * ms/1000;
    dinoYVelocity += dinoGravity;
    if (dinoY > canvas.height - dinoHeight) {
        dinoY = canvas.height - dinoHeight;
        dinoYVelocity = 0;
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'ArrowUp') {
        dinoYVelocity = 256;
    }
});

setInterval(function() {
    update(tickSpeed);
    draw();
}, tickSpeed);