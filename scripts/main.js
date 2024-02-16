const reuslt = images.requestScreenCapture(false);
console.log(reuslt);
const image = captureScreen();

const clip = images.clip(image, 1522, 892, 261, 58);
const fileName = "sortie_prepare";

clip.saveTo("/mnt/shared/Pictures/" + fileName + ".png");
