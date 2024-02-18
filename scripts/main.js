const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 1617, 53, 216, 47);
const fileName = "news";

clip.saveTo("/mnt/shared/Pictures/" + fileName + ".png");