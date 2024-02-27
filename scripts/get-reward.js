const getReward = require("/mnt/shared/Pictures/scripts/get-reward.js");

const 收获奖励 = images.read("/mnt/shared/Pictures/get_reward.png");
const 章节结束 = images.read("/mnt/shared/Pictures/zhangjie_over.png");
const 远征完成 = images.read("/mnt/shared/Pictures/yuanzheng_finished.png");
const 出征 = images.read("/mnt/shared/Pictures/chuzheng.png");
const 确认 = images.read("/mnt/shared/Pictures/confirm.png");

// 是否快速收获奖励 true(开启) 或者 false(关闭)
const quickGetReward = false;

/**
 * 当前页面要处于出征页面！否则不会收获奖励
 */

getReward(收获奖励, 章节结束, 远征完成, 确认, 出征, quickGetReward)
// 15分钟检查一次
setInterval(() => {
  getReward(收获奖励, 章节结束, 远征完成, 确认, 出征, quickGetReward);
}, 15 * 60 * 1000);
