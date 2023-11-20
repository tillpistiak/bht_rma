var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var rasterSizeInput = document.getElementById("rasterSizeInput");

var img = new Image();
img.src = "colored.jpg";

var rasterSize = parseInt(rasterSizeInput.value);

img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;

  applyRasterFilter();
};

rasterSizeInput.addEventListener("input", function () {
  rasterSize = parseInt(rasterSizeInput.value);
  applyRasterFilter();
});

function applyRasterFilter() {
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  for (var x = 0; x < imgData.width; x++) {
    for (var y = 0; y < imgData.height; y++) {
      var rasterX = ((x / rasterSize) | 0) * rasterSize;
      var rasterY = ((y / rasterSize) | 0) * rasterSize;

      var rasterValIndex = (rasterX + rasterY * imgData.width) * 4;

      var r = imgData.data[rasterValIndex];
      var g = imgData.data[rasterValIndex + 1];
      var b = imgData.data[rasterValIndex + 2];
      var a = imgData.data[rasterValIndex + 3];

      imgData.data.set([r, g, b, a], (x + y * imgData.width) * 4);
    }
  }

  ctx.putImageData(imgData, 0, 0);
}
