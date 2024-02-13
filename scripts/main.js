const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 300, 20, 120, 50);
const fileName = "chuzheng";

clip.saveTo("/mnt/shared/Pictures/" + fileName + ".png");
