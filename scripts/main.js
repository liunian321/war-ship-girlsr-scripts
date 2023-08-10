const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();
const clip = images.clip(image, 1580, 985, 195, 50);
clip.saveTo("/sdcard/images/go_to_war.png");
