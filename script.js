const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let isMouseDown = false;

canvas.addEventListener('mousedown', function(e) {
    isMouseDown = true;
    handleMouseDown(canvas, e);
});

canvas.addEventListener('mouseup', function(e) {
    isMouseDown = false;
});

canvas.addEventListener('mousemove', function(evt) {
    if (isMouseDown) {
        handleMouseDown(canvas, evt);
    }
});

const cellRows = 18;
const cellCols = 24;
let cellWidth = canvas.width / cellCols;
let cellHeight = canvas.height / cellRows;
let cells = new Array(cellRows);
for (let i = 0; i < cellRows; i++) {
    cells[i] = new Array(cellCols);
    for (let j = 0; j < cellCols; j++) {
        cells[i][j] = 0;
    }
}

anim();
function anim() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cellRows; i++) {
        for (let j = 0; j < cellCols; j++) {
            ctx.fillStyle = blackOrWhiteColorString(cells[i][j]);
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth - 1, cellHeight - 1);
        }
    }
    requestAnimationFrame(anim);
}

function blackOrWhiteColorString(x) {
    if (x == 0) {
        return "white";
    } else {
        return "black";
    }
}

function handleMouseDown(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const row = Math.floor(y / cellHeight);
    const col = Math.floor(x / cellWidth);
    cells[row][col] = 1;
}

function startAnimation() {
    for (let i = 0; i < cellRows; i++) {
        for (let j = 0; j < cellCols; j++) {
            cells[i][j] = 1 - cells[i][j];
        }
    }
    setTimeout(startAnimation, 700);
}