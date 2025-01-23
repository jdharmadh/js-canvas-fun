const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

cellRows = 18;
cellCols = 24;
let cellWidth = canvas.width / cellCols;
let cellHeight = canvas.height / cellRows;
cells = new Array(cellRows);
for (let i = 0; i < cellRows; i++) {
    cells[i] = new Array(cellCols);
    for (let j = 0; j < cellCols; j++) {
        cells[i][j] = Math.floor(Math.random() * 2);
    }
}

function anim () {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < cellRows; i++) {
        for (let j = 0; j < cellCols; j++) {
            ctx.fillStyle = blackOrWhiteColorString(cells[i][j]);
            ctx.fillRect(j * cellWidth, i * cellHeight, cellWidth, cellHeight);
        }
    }
    //sleep for 1000 ms
    setTimeout(anim, 400);
}

function grabRandomColorString() {
    randomRed = Math.floor(Math.random() * 255);
    randomGreen = Math.floor(Math.random() * 255);
    randomBlue = Math.floor(Math.random() * 255);
    return "rgb(" + randomRed + "," + randomGreen + "," + randomBlue + ")";
}

function blackOrWhiteColorString(x) {
    if (x == 0) {
        return "white";
    } else {
        return "black";
    }
}