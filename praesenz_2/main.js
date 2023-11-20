let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let rasterSizeInput = document.getElementById("rasterSizeInput");
let animationSpeedInput = document.getElementById("animationSpeedInput");

let img = new Image();
img.src = "monster.png";

let numberOfFrames = 4;
let spriteWidth;
let spriteHeight;
let interval;
let currentFrame = 0;

let rasterSize = parseInt(rasterSizeInput.value);
let animationSpeed = 200 - parseInt(animationSpeedInput.value);

img.onload = function () {
  spriteWidth = img.width / numberOfFrames;
  spriteHeight = img.height;

  canvas.width = spriteWidth;
  canvas.height = spriteHeight;

  interval = setInterval(animate, animationSpeed);
  rasterSizeInput.addEventListener("input", function () {
    rasterSize = parseInt(rasterSizeInput.value);
  });
  animationSpeedInput.addEventListener("input", function () {
    animationSpeed = 200 - parseInt(animationSpeedInput.value);
    clearInterval(interval);
    interval = setInterval(animate, animationSpeed);
  });
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    img,
    currentFrame * spriteWidth,
    0,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  );

  currentFrame = (currentFrame + 1) % numberOfFrames;
  applyRasterFilter();
}

function applyRasterFilter() {
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (let x = 0; x < imgData.width; x++) {
    for (let y = 0; y < imgData.height; y++) {
      let rasterX = ((x / rasterSize) | 0) * rasterSize;
      let rasterY = ((y / rasterSize) | 0) * rasterSize;

      let rasterValIndex = (rasterX + rasterY * imgData.width) * 4;

      let r = imgData.data[rasterValIndex];
      let g = imgData.data[rasterValIndex + 1];
      let b = imgData.data[rasterValIndex + 2];
      let a = imgData.data[rasterValIndex + 3];

      imgData.data.set([r, g, b, a], (x + y * imgData.width) * 4);
    }
  }

  ctx.putImageData(imgData, 0, 0);
}
