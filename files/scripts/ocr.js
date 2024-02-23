
// // 申请截图权限
// requestScreenCapture(false);

// if (ok) {
//   toastLog("初始化成功: " + tessocr.getInitLanguagesAsString());
// } else {
//   toastLog("初始化失败");
// }

// /**
//  * 基于图片搜索文字所在坐标
//  * @param {*} image
//  * @param {*} text
//  */
// function findText(image, text) {
//   if (!image) {
//     image = captureScreen();
//   }

//   // 设置 Tesseract 的图像数据
//   tessocr.setImage(image.getBitmap());

//   // 在图像中查找文本
//   const iterator = tessocr.getResultIterator();
//   let boundingBox;
//   do {
//     const currentText = iterator.getUTF8Text(
//       TessBaseAPI.PageIteratorLevel.RIL_WORD
//     );
//     if (currentText == text) {
//       boundingBox = iterator.getBoundingBox(
//         TessBaseAPI.PageIteratorLevel.RIL_WORD
//       );
//       break;
//     }
//   } while (iterator.next(TessBaseAPI.PageIteratorLevel.RIL_WORD));

//   // 如果找到了文本，返回其坐标
//   if (boundingBox) {
//     return {
//       x: boundingBox.x,
//       y: boundingBox.y,
//       width: boundingBox.width,
//       height: boundingBox.height,
//     };
//   } else {
//     // 如果没有找到文本，返回 null
//     return null;
//   }
// }
// module.exports = findText;
