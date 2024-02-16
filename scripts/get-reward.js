const getReward = require("/mnt/shared/Pictures/scripts/get-reward.js");

const 收获奖励 = images.read("/mnt/shared/Pictures/get_reward.png");
const 章节结束 = images.read("/mnt/shared/Pictures/zhangjie_over.png");
const 远征完成 = images.read("/mnt/shared/Pictures/yuanzheng_finished.png");
const 出征 = images.read("/mnt/shared/Pictures/chuzheng.png");
const 确认 = images.read("/mnt/shared/Pictures/confirm.png");

// 是否快速收获奖励 true(开启) 或者 false(关闭)
const quickGetReward = false;
let isFirst = true;

while (true) {
  const isGetReward = getReward(
    收获奖励,
    章节结束,
    远征完成,
    确认,
    出征,
    quickGetReward
  );

  // 如果是第一次并且已经收获奖励，则等待15分钟
  if (isGetReward && isFirst) {
    isFirst = false;
  }

  if (isFirst) {
    // 第一次等待5分钟
    sleep(5 * 60 * 1000);
  } else {
    // 之后每次等待15分钟
    sleep(15 * 60 * 1000);
  }
}
