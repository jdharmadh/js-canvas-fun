const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const width = canvas.width;
// Get slider elements and value displays
const redSlider = document.getElementById("red");
const greenSlider = document.getElementById("green");
const blueSlider = document.getElementById("blue");
const redValue = document.getElementById("red-value");
const greenValue = document.getElementById("green-value");
const blueValue = document.getElementById("blue-value");

// Initialize color factors
let redFactor = parseInt(redSlider.value, 10) / 255;
let greenFactor = parseInt(greenSlider.value, 10) / 255;
let blueFactor = parseInt(blueSlider.value, 10) / 255;

// Update factors and display on slider input
redSlider.addEventListener("input", () => {
    redFactor = parseInt(redSlider.value, 10) / 255;
    redValue.textContent = redSlider.value;
});
greenSlider.addEventListener("input", () => {
    greenFactor = parseInt(greenSlider.value, 10) / 255;
    greenValue.textContent = greenSlider.value;
});
blueSlider.addEventListener("input", () => {
    blueFactor = parseInt(blueSlider.value, 10) / 255;
    blueValue.textContent = blueSlider.value;
});

const height = canvas.height;
const rectWidth = 100;
const rectHeight = 100;
const x = (width - rectWidth) / 2;
const y = (height - rectHeight) / 2;

const pixelSize = 4;
const rows = Math.floor(height / pixelSize);
const cols = Math.floor(width / pixelSize);
const pixels = [];
const values = [];
let time = 0;

for (let row = 0; row < rows; row++) {
    values[row] = [];
    pixels[row] = [];
    for (let col = 0; col < cols; col++) {
        values[row][col] = [
            Math.floor(Math.random() * 256), // Red
            Math.floor(Math.random() * 256), // Green
            Math.floor(Math.random() * 256)  // Blue
        ];
        const [r, g, b] = values[row][col];
        pixels[row][col] = `rgb(${r},${g},${b})`;
    }
}

function update() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Red channel
            var value1r = noise.simplex3(row / 100, col / 100, time);
            var value2r = 0.5 * noise.simplex3(row / 50, col / 50, time + 10);
            var value3r = 0.25 * noise.simplex3(row / 25, col / 25, time + 20);
            // Green channel
            var value1g = noise.simplex3(row / 100, col / 100, time + 30);
            var value2g = 0.5 * noise.simplex3(row / 50, col / 50, time + 40);
            var value3g = 0.25 * noise.simplex3(row / 25, col / 25, time + 50);
            // Blue channel
            var value1b = noise.simplex3(row / 100, col / 100, time + 60);
            var value2b = 0.5 * noise.simplex3(row / 50, col / 50, time + 70);
            var value3b = 0.25 * noise.simplex3(row / 25, col / 25, time + 80);

            values[row][col][0] = Math.abs(value1r + value2r + value3r) * 256 * redFactor;
            values[row][col][1] = Math.abs(value1g + value2g + value3g) * 256 * greenFactor;
            values[row][col][2] = Math.abs(value1b + value2b + value3b) * 256 * blueFactor;

            const [r, g, b] = values[row][col].map(v => Math.max(0, Math.min(255, Math.floor(v))));
            pixels[row][col] = `rgb(${r},${g},${b})`;
        }
    }
}

function draw() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ctx.fillStyle = pixels[row][col];
      ctx.fillRect(col * pixelSize, row * pixelSize, pixelSize, pixelSize);
    }
  }
}

setInterval(() => {
  update();
  draw();
  time += 0.03;
}, 50);
