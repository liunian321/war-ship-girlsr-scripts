const getReward = require("/mnt/shared/Pictures/scripts/get-reward.js");

const sortie_prepare = images.read("/mnt/shared/Pictures/sortie_prepare.png");
const go_to_war_image = images.read("/mnt/shared/Pictures/go_to_war.png");
const start_fight_image = images.read("/mnt/shared/Pictures/start_fight.png");
const abandon_image = images.read("/mnt/shared/Pictures/abandon.png");
const go_back_image = images.read("/mnt/shared/Pictures/go_back.png");
// 阵型
const trapezoidal_image = images.read("/mnt/shared/Pictures/trapezoidal.png");

const 收获奖励 = images.read("/mnt/shared/Pictures/get_reward.png");
const 章节结束 = images.read("/mnt/shared/Pictures/zhangjie_over.png");
const 远征完成 = images.read("/mnt/shared/Pictures/yuanzheng_finished.png");
const 出征 = images.read("/mnt/shared/Pictures/chuzheng.png");
const 确认 = images.read("/mnt/shared/Pictures/confirm.png");

// 申请截图权限
requestScreenCapture(false);

let tryCount = 0;

while (true) {
  let matchingResult = images.matchTemplate(captureScreen(), sortie_prepare, {
    max: 1,
    region: [1450, 860, 380, 120],
  });

  console.log("出击准备");
  let matche = matchingResult.matches[0];

  if (!matche) {
    console.log("没有找到出击准备");
    break;
  } else {
    if (tryCount === 10) {
      // 出征了10次，下次开始收获奖励
      tryCount = 0;
    } else {
      if (tryCount === 0) {
        // 退出出击准备，准备收获奖励
        click(1832, 107);

        // 等待动画
        sleep(2000);

        // 退出作战页面
        click(77, 77);

        // 等待动画
        sleep(2000);

        // 点击出征
        click(1808, 980);

        // 等待动画
        sleep(2000);

        // 尝试收获奖励
        getReward(收获奖励, 章节结束, 远征完成, 确认, 出征);

        console.log("退出出征页面");
        click(77, 77);

        // 等待动画
        sleep(2000);

        // 点击活动图案
        click(1765, 526);

        // 等待动画
        sleep(2000);

        // 点击ex-10图标
        click(973, 432);

        // 等待动画
        sleep(2000);
      }
      tryCount++;
    }
  }

  click(matche.point.x + 5, matche.point.y + 5);

  sleep(2000);

  // 开始出征
  matchingResult = images.matchTemplate(captureScreen(), go_to_war_image, {
    max: 1,
    region: [1570, 975, 215, 60],
  });

  matche = matchingResult.matches[0];
  click(matche.point.x + 5, matche.point.y + 5);
  console.log("开始出征");

  // 等待出征动画
  for (let index = 0; index < 7; index++) {
    sleep(300);
    click(1000, 950);
  }

  // 等待出征界面
  waitForStartFight(1);

  console.log("准备开始战斗");
  click(1645, 985);
  sleep(1500);

  // 选择梯形阵
  selectTrapezoidal();

  sleep(20000);
  // 检查是否需要放弃战斗
  let abandon = false;

  while (true) {
    if (!abandon) {
      matchingResult = images.matchTemplate(captureScreen(), abandon_image, {
        max: 1,
        region: [1350, 960, 150, 100],
      });
      if (
        matchingResult.matches !== undefined &&
        matchingResult.matches.length > 0 &&
        matchingResult.matches[0].similarity > 0.8
      ) {
        console.log("放弃战斗");
        click(
          matchingResult.matches[0].point.x + 5,
          matchingResult.matches[0].point.y + 5
        );
        abandon = true;
        sleep(1500);
      }
    }

    click(1200, 600);
    sleep(500);

    matchingResult = images.matchTemplate(captureScreen(), go_back_image, {
      max: 1,
      region: [1210, 670, 90, 60],
    });
    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0 &&
      matchingResult.matches[0].similarity > 0.8
    ) {
      console.log("回港");
      click(
        matchingResult.matches[0].point.x + 5,
        matchingResult.matches[0].point.y + 5
      );
      sleep(1500);
      break;
    }
  }
}

function waitForStartFight(flag) {
  let faildedCount = 0;
  while (true) {
    let matchingResult = images.matchTemplate(
      captureScreen(),
      start_fight_image,
      {
        max: 1,
        region: [1630, 970, 195, 60],
      }
    );
    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0 &&
      matchingResult.matches[0].similarity > 0.8
    ) {
      break;
    }
    faildedCount++;
    click(800, 950);
    sleep(500 + 50 * faildedCount);
    matchingResult = images.matchTemplate(captureScreen(), trapezoidal_image, {
      max: 1,
      region: [1700, 800, 160, 60],
    });
    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0 &&
      matchingResult.matches[0].similarity > 0.8
    ) {
      break;
    }
  }
}

function selectTrapezoidal() {
  let faildedCount = 0;
  while (true) {
    sleep(1000);
    const matchingResult = images.matchTemplate(
      captureScreen(),
      trapezoidal_image,
      {
        max: 1,
        region: [1700, 800, 160, 60],
      }
    );
    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0 &&
      matchingResult.matches[0].similarity > 0.8
    ) {
      console.log("使用梯形阵");
      click(
        matchingResult.matches[0].point.x + 5,
        matchingResult.matches[0].point.y + 5
      );
      break;
    }
    faildedCount++;

    if (faildedCount > 5) {
      break;
    }
  }
}
