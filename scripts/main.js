const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 1218, 683, 77, 40);
const fileName = "abandon";

clip.saveTo("/mnt/shared/Pictures/" + fileName + ".png");