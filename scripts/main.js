const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();
const clip = images.clip(image, 1460, 195, 185, 40);
clip.saveTo("/sdcard/images/test.png");
