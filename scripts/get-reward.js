const getReward = require("/mnt/shared/Pictures/scripts/get-reward.js");

const 收获奖励 = images.read("/mnt/shared/Pictures/get_reward.png");
const 章节结束 = images.read("/mnt/shared/Pictures/zhangjie_over.png");
const 远征完成 = images.read("/mnt/shared/Pictures/yuanzheng_finished.png");
const 出征 = images.read("/mnt/shared/Pictures/chuzheng.png");
const 确认 = images.read("/mnt/shared/Pictures/confirm.png");

while (true) {
  getReward(收获奖励, 章节结束, 远征完成, 确认, 出征);

  // 等待5分钟
  sleep(300000);
}
