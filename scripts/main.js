const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 160, 722, 45, 11);
const fileName = "zhangjie_over";

clip.saveTo("/mnt/shared/Pictures/" + fileName + ".png");