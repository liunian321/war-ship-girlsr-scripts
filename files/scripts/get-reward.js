/**
 * quickGetReward 是否快速收获奖励
 * 因为每次到零点，快速收获奖励的判断会失效。所以如果需要长时间的挂机，建议关闭快速收获奖励
 */
function getReward(收获奖励, 章节结束, 远征完成, 确认, 出征, quickGetReward) {
  let getReward = false;
  // 申请截图权限
  requestScreenCapture(false);
  const isEmpty = require("lodash/isEmpty");
  if (isEmpty(quickGetReward)) {
    quickGetReward = false;
    console.log("快速收获奖励未设置，默认关闭");
  }

  let matchingResult;
  if (quickGetReward) {
    matchingResult = images.matchTemplate(captureScreen(), 远征完成, {
      max: 1,
      region: [795, 0, 200, 100],
    });

    if (
      matchingResult.matches === undefined ||
      matchingResult.matches.length === 0
    ) {
      console.log("没有可收获的奖励");
      return;
    }
  }

  console.log("准备收获奖励");

  // 如果远征完成，则开始收获奖励
  click(850, 35);
  sleep(2000);

  while (true) {
    matchingResult = images.matchTemplate(captureScreen(), 收获奖励, {
      max: 1,
    });

    // 如果无奖励，选择下一个章节进行检查
    if (
      matchingResult.matches === undefined ||
      matchingResult.matches.length === 0
    ) {
      matchingResult = images.matchTemplate(captureScreen(), 章节结束, {
        max: 1,
        region: [140, 710, 90, 90],
      });

      // 已经到达最后一章，结束
      if (
        matchingResult.matches !== undefined &&
        matchingResult.matches.length > 0
      ) {
        console.log("章节结束");
        break;
      }

      click(155, 720);
      // 等待动画结束
      sleep(2000);
    } else {
      matche = matchingResult.matches[0];

      console.log("收获奖励");
      click(matche.point.x + 5, matche.point.y + 5);
      getReward = true;

      // 等待动画结束
      sleep(2000);
      click(1000, 950);

      for (let index = 0; index < 3; index++) {
        sleep(2000);

        matchingResult = images.matchTemplate(captureScreen(), 确认, {
          max: 1,
          region: [630, 640, 200, 80],
        });

        if (
          matchingResult.matches !== undefined &&
          matchingResult.matches.length > 0
        ) {
          matche = matchingResult.matches[0];
          click(matche.point.x + 5, matche.point.y + 5);
          break;
        }
      }

      // 等待动画结束
      sleep(2000);
    }

    if (quickGetReward) {
      matchingResult = images.matchTemplate(captureScreen(), 远征完成, {
        max: 1,
        region: [795, 0, 200, 100],
      });

      if (
        matchingResult.matches === undefined ||
        matchingResult.matches.length === 0
      ) {
        console.log("没有可收获的奖励");
        break;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    matchingResult = images.matchTemplate(captureScreen(), 出征, {
      max: 1,
      region: [280, 10, 150, 100],
    });

    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0
    ) {
      matche = matchingResult.matches[0];
      click(matche.point.x + 60, matche.point.y + 25);
      sleep(2000);
      break;
    }

    sleep(2000);
  }

  return getReward;
}

module.exports = getReward;
