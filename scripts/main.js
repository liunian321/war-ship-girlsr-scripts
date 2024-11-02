const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 870, 585, 190, 55);
const fileName = "retry";

clip.saveTo("/mnt/shared/Pictures/" + fileName + ".png");
