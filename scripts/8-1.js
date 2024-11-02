const getReward = require("/mnt/shared/Pictures/scripts/get-reward.js");

// 舰船图标
const CL_1_image = images.read("/mnt/shared/Pictures/CL_1.png");
const SSI_image = images.read("/mnt/shared/Pictures/ss-I.png");

// 关键点
const title_image = images.read("/mnt/shared/Pictures/8-1_title.png");
const start_fight_image = images.read("/mnt/shared/Pictures/start_fight.png");
const go_to_war_image = images.read("/mnt/shared/Pictures/go_to_war.png");
const go_back_image = images.read("/mnt/shared/Pictures/go_back.png");
const abandon_image = images.read("/mnt/shared/Pictures/abandon.png");

// 阵型
const single_transverse_image = images.read(
  "/mnt/shared/Pictures/single_transverse.png"
);

const 收获奖励 = images.read("/mnt/shared/Pictures/get_reward.png");
const 远征完成 = images.read("/mnt/shared/Pictures/yuanzheng_finished_1.png");
const 出征 = images.read("/mnt/shared/Pictures/chuzheng.png");
const 确认 = images.read("/mnt/shared/Pictures/confirm.png");

// 是否快速收获奖励 true(开启) 或者 false(关闭)
const quickGetReward = false;
// 尝试战斗花费时间
let attempted_battles = 0;

requestScreenCapture(false);

while (true) {
  let matchingResult = images.matchTemplate(captureScreen(), title_image, {
    max: 1,
    region: [1410, 190, 280, 50],
  });

  if (
    matchingResult.matches === undefined ||
    matchingResult.matches.length === 0
  ) {
    console.log("不是8-1地图!");
    break;
  }

  if (attempted_battles >= 1800) {
    // 尝试收获奖励
    getReward(收获奖励, 远征完成, 确认, 出征, quickGetReward);
    attempted_battles = 0;
  }else if(attempted_battles >= 900){
    getReward(收获奖励, 远征完成, 确认, 出征, true);
    console.log("尝试战斗时间：" + attempted_battles + "秒");
  }

  let matche = matchingResult.matches[0];
  click(matche.point.x + 5, matche.point.y + 5);
  rest(2000);

  matchingResult = images.matchTemplate(captureScreen(), go_to_war_image, {
    max: 1,
    region: [1570, 970, 220, 65],
  });
  // TODO:检查舰船的状态

  // 开始出征
  matche = matchingResult.matches[0];
  click(matche.point.x + 5, matche.point.y + 5);
  // 等待出征动画
  for (let index = 0; index < 7; index++) {
    rest(300);
    click(1000, 950);
  }

  while (true) {
    matchingResult = images.matchTemplate(captureScreen(), start_fight_image, {
      max: 1,
      region: [1630, 970, 195, 60],
    });
    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0 &&
      matchingResult.matches[0].similarity > 0.8
    ) {
      break;
    }
    click(1000, 950);
    rest(300);
  }

  let screen_image = captureScreen();

  matchingResult = images.matchTemplate(screen_image, CL_1_image, {
    max: 1,
    region: [30, 480, 550, 140],
  });
  if (
    matchingResult.matches !== undefined &&
    matchingResult.matches.length > 0 &&
    matchingResult.matches[0].similarity >= 0.8
  ) {
    console.log("有轻巡, 准备退出");
    click(1370, 980);
    rest(1500);
    continue;
  }

  matchingResult = images.matchTemplate(screen_image, SSI_image, {
    max: 1,
    region: [30, 300, 550, 140],
  });
  if (
    matchingResult.matches === undefined ||
    matchingResult.matches.length === 0
  ) {
    console.log("有重巡, 准备退出");
    click(1370, 980);
    rest(1500);
    continue;
  }

  console.log("准备开始战斗");
  click(1645, 985);
  while (true) {
    rest(1000);
    matchingResult = images.matchTemplate(
      captureScreen(),
      single_transverse_image,
      {
        max: 1,
        region: [1700, 980, 150, 60],
      }
    );
    if (
      matchingResult.matches !== undefined &&
      matchingResult.matches.length > 0 &&
      matchingResult.matches[0].similarity > 0.8
    ) {
      console.log("使用单横阵");
      click(
        matchingResult.matches[0].point.x + 10,
        matchingResult.matches[0].point.y + 10
      );
      break;
    }
  }

  rest(15000);

  // 检查是否需要放弃战斗
  let abandon = false;

  while (true) {
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
        rest(1500);
      }
    }

    click(1200, 600);
    rest(500);

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
      rest(1500);
      break;
    }
  }
}

function rest(time) {
  sleep(time);
  attempted_battles += time / 1000;
}