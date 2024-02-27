const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 848, 16, 94, 90);
const fileName = "舰船已满";
104,55
48,109

clip.saveTo("/mnt/shared/Pictures/failed/" + fileName + ".png");