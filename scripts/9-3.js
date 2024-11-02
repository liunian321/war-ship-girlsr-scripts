const getReward = require("/mnt/shared/Pictures/scripts/get-reward.js");

//关键点
const title_image = images.read("/mnt/shared/Pictures/9-3.png");
const go_to_war_image = images.read("/mnt/shared/Pictures/go_to_war.png");
const go_back_image = images.read("/mnt/shared/Pictures/go_back.png");
const start_fight_image = images.read("/mnt/shared/Pictures/start_fight.png");
const advance_image = images.read("/mnt/shared/Pictures/advance.png");
const abandon_image = images.read("/mnt/shared/Pictures/abandon.png");
// 阵型
const trapezoidal_image = images.read("/mnt/shared/Pictures/trapezoidal.png");
// 防驱
const fq = images.read("/mnt/shared/Pictures/fq.png");
// 补给
const bj = images.read("/mnt/shared/Pictures/bj.png");

const 收获奖励 = images.read("/mnt/shared/Pictures/get_reward.png");
const 章节结束 = images.read("/mnt/shared/Pictures/zhangjie_over.png");
const 远征完成 = images.read("/mnt/shared/Pictures/yuanzheng_finished_1.png");
const 出征 = images.read("/mnt/shared/Pictures/chuzheng.png");
const 确认 = images.read("/mnt/shared/Pictures/confirm.png");

// 是否快速收获奖励 true(开启) 或者 false(关闭)
const quickGetReward = false;

// 二战是否只打补给舰队
let only_BJ = true;
// 当天获取了战利品数量
let loot_count = 0;

// 尝试战斗花费时间
let attempted_battles = 0;

// 申请截图权限
requestScreenCapture(false);

while (true) {
  if (attempted_battles >= 1600) {
    // 尝试收获奖励
    getReward(收获奖励, 章节结束, 远征完成, 确认, 出征, quickGetReward);
    attempted_battles = 0;
  } else if (attempted_battles >= 800) {
    getReward(收获奖励, 章节结束, 远征完成, 确认, 出征, true);
    console.log("尝试战斗时间：" + attempted_battles + "秒");
    attempted_battles = 0;
  }

  let matchingResult = images.matchTemplate(captureScreen(), title_image, {
    max: 1,
    region: [1400, 190],
  });
  if (
    matchingResult.matches === undefined ||
    matchingResult.matches.length === 0
  ) {
    console.log("不是9-3地图!");
    break;
  }

  let matche = matchingResult.matches[0];
  click(matche.point.x + 5, matche.point.y + 5);
  sleep(2500);
  attempted_battles += 2;

  matchingResult = images.matchTemplate(captureScreen(), go_to_war_image, {
    max: 1,
    region: [1570, 970, 220, 65],
  });

  console.log("开始出征");
  matche = matchingResult.matches[0];
  click(matche.point.x + 5, matche.point.y + 5);

  // 等待出征动画
  for (let index = 0; index < 7; index++) {
    sleep(500);
    attempted_battles += 0.5;
    click(1000, 950);
  }

  waitForStartFight();

  console.log("检查敌方舰队是否为目标舰队");

  matchingResult = images.matchTemplate(captureScreen(), fq, {
    max: 1,
    region: [590, 650, 560, 150],
  });
  if (
    matchingResult.matches &&
    matchingResult.matches.length > 0 &&
    matchingResult.matches[0].similarity > 0.8
  ) {
    console.log(matchingResult.matches);
    console.log("不是目标舰队，返回");
    click(1370, 980);
    sleep(2000);
    attempted_battles += 2;
    continue;
  }

  console.log("准备开始战斗");
  click(1645, 985);

  selectTrapezoidal();

  let abandon = false;
  sleep(17000);
  attempted_battles += 17;
  while (true) {
    click(1200, 600);
    sleep(500);
    attempted_battles += 0.5;

    // 如果没有点过放弃按钮，就检查是否需要放弃
    if (!abandon) {
      matchingResult = images.matchTemplate(captureScreen(), abandon_image, {
        max: 1,
        region: [1125, 661, 262, 85],
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
        sleep(2000);
        attempted_battles += 2;
      }
    }

    matchingResult = images.matchTemplate(captureScreen(), advance_image, {
      max: 1,
      region: [620, 670, 90, 60],
    });
    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0 &&
      matchingResult.matches[0].similarity > 0.8
    ) {
      console.log("点击前进");
      click(
        matchingResult.matches[0].point.x + 5,
        matchingResult.matches[0].point.y + 5
      );
      break;
    }
  }

  // 等待开始战斗按钮出现
  waitForStartFight();

  // 当天获取了战利品数量小于50或者只打补给舰队
  if (only_BJ || loot_count < 50) {
    matchingResult = images.matchTemplate(captureScreen(), bj, {
      max: 1,
      region: [30, 480, 550, 140],
    });
    if (
      matchingResult.matches === undefined ||
      matchingResult.matches.length === 0
    ) {
      console.log(matchingResult.matches);
      console.log("不是目标舰队，返回");
      click(1370, 980);
      sleep(2000);
      attempted_battles += 2;
      continue;
    } else {
      loot_count++;
    }
  } else if (loot_count >= 50) {
    only_BJ = false;
  }

  // 点击开始战斗
  click(1645, 985);
  selectTrapezoidal();
  sleep(20000);
  attempted_battles += 20;

  abandon = false;
  while (true) {
    console.log("确认战斗是否结束");

    // 如果没有点过放弃按钮，就检查是否需要放弃
    if (!abandon) {
      matchingResult = images.matchTemplate(captureScreen(), abandon_image, {
        max: 1,
        region: [1125, 661, 262, 85],
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
        sleep(2000);
        attempted_battles += 2;
      }
    }

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

    sleep(2000);
    attempted_battles += 2;
    click(200, 100);
  }
}

function waitForStartFight() {
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
    attempted_battles += 0.5 + 0.05 * faildedCount;
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

/**
 * 选择梯形阵
 */
function selectTrapezoidal() {
  let faildedCount = 0;
  while (true) {
    sleep(1000);
    attempted_battles += 1;
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
