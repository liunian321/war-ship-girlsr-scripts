const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 16, 16, 94, 90);
const fileName = "return";
104,55
48,109

clip.saveTo("/mnt/shared/Pictures/" + fileName + ".png");