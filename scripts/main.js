const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 1220, 680, 75, 45);
const fileName = "go_back";

clip.saveTo("/sdcard/images/" + fileName + ".png");
