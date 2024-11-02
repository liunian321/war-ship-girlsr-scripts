const getReward = require("/mnt/shared/Pictures/scripts/get-reward.js");

const return_image = images.read("/mnt/shared/Pictures/return.png");
const sortie_prepare = images.read("/mnt/shared/Pictures/sortie_prepare.png");
const go_to_war_image = images.read("/mnt/shared/Pictures/go_to_war.png");
const start_fight_image = images.read("/mnt/shared/Pictures/start_fight.png");
const abandon_image = images.read("/mnt/shared/Pictures/abandon.png");
const go_back_image = images.read("/mnt/shared/Pictures/go_back.png");
const receive_reward_image = images.read("/mnt/shared/Pictures/receive_reward.png");
// 活动图案
const activation_image = images.read("/mnt/shared/Pictures/2024-09-30-activation_flag.png");
// EX-7 图标
const ex_7_image = images.read("/mnt/shared/Pictures/EX-7_flag.png");

// 阵型
const trapezoidal_image = images.read("/mnt/shared/Pictures/trapezoidal.png");

const 收获奖励 = images.read("/mnt/shared/Pictures/get_reward.png");
const 章节结束 = images.read("/mnt/shared/Pictures/zhangjie_over.png");
const 远征完成 = images.read("/mnt/shared/Pictures/yuanzheng_finished.png");
const 出征 = images.read("/mnt/shared/Pictures/chuzheng.png");
const 确认 = images.read("/mnt/shared/Pictures/confirm.png");

// 申请截图权限
requestScreenCapture(false);

// 尝试战斗花费时间
let attempted_battles = 0;

// 领取每日奖励时间戳
let getDailyRewardTimeStamp = -1;

while (true) {
    let matchingResult = images.matchTemplate(captureScreen(), sortie_prepare, {
        max: 1,
        region: [1444, 860, 380, 120],
    });

    console.log("出击准备");
    let matche = matchingResult.matches[0];

    if (!matche) {
        console.log("没有找到出击准备");
        rest(1000);
    } else {
        if (attempted_battles >= 1800) {
            // 退出出击准备，准备收获奖励
            secureClick(1832, 107);

            // 等待动画
            rest(2000);

            // 退出作战页面
            secureClick(77, 77);

            // 等待动画
            rest(2000);

            // 如果距离上次领取每日奖励的时间超过23小时或者当前小时为0点，则尝试领取每日奖励
            if (
                // getDailyRewardTimeStamp === -1 ||
                new Date().getHours() === 0 ||
                new Date().getTime() - getDailyRewardTimeStamp > 23 * 60 * 60 * 1000
            ) {
                receive_daily_reward();
            }

            // 点击出征
            secureClick(1800, 970);

            // 等待动画
            rest(getRandomInt(1900, 2100));

            getReward(收获奖励, 远征完成, 确认, 出征, true);
            attempted_battles = 0;

            console.log("退出出征页面");
            secureClick(77, 77);

            console.log("点击活动图案");
            // 由于返回主界面需要加载，所以等待一段时间
            waitForImage({
                image: activation_image,
                secureClick: true,
            });

            rest(getRandomInt(1900, 2100));

            // 点击EX-7图标
            matchingResult = images.matchTemplate(captureScreen(), ex_7_image, {
                max: 1,
            });

            matche = matchingResult.matches[0];
            secureClick(matche.point.x + 5, matche.point.y + 5);
            // 等待动画
            rest(getRandomInt(1900, 2100));
        }

        while (true) {
            matchingResult = images.matchTemplate(captureScreen(), sortie_prepare, {
                max: 1,
                region: [1450, 860, 380, 120],
            });

            matche = matchingResult.matches[0];

            if (matche) {
                console.log("出击准备");
                secureClick(matche.point.x + 5, matche.point.y + 5);
                break;
            }

            rest(getRandomInt(1900, 2100));
        }

        while (true) {
            // 开始出征
            matchingResult = images.matchTemplate(captureScreen(), go_to_war_image, {
                max: 1,
                region: [1570, 975, 215, 60],
            });

            matche = matchingResult.matches[0];
            if (matche) {
                secureClick(matche.point.x + 5, matche.point.y + 5);
                rest(getRandomInt(100, 300))
                secureClick(matche.point.x + 5, matche.point.y + 5);
                console.log("开始出征");
                rest(2000);
                break;
            }
            rest(getRandomInt(1000, 1200));
        }

        // 等待出征动画
        for (let index = 0; index < 7; index++) {
            rest(300);
            secureClick(970, 920);
        }

        // 等待出征界面
        waitForStartFight();

        // console.log("准备开始战斗");
        // secureClick(1645, 985);
        // rest(getRandomInt(1500, 1600));

        // 选择梯形阵
        // selectTrapezoidal();

        rest(getRandomInt(30_000, 35_000));
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
                    secureClick(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
                    abandon = true;
                    rest(1500);
                }
            }

            secureClick(1200, 600);
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
                secureClick(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
                rest(2500);
                break;
            }
        }
    }
}

function waitForStartFight() {
    let faildedCount = 0;
    while (true) {
        let matchingResult = images.matchTemplate(captureScreen(), start_fight_image, {
            max: 1,
        });
        if (
            matchingResult.matches !== undefined &&
            matchingResult.matches.length > 0 &&
            matchingResult.matches[0].similarity > 0.8
        ) {
            break;
        }
        faildedCount++;
        secureClick(800, 950);
        rest(500 + 100 * faildedCount);
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

        if (faildedCount > 1) {
            // 截图
            // const image = captureScreen();
            // image.saveTo("/mnt/shared/Pictures/failed/未成功索敌.png");
            // 判断是否船舱满了 如果是则退出

            console.log("未成功索敌");
            break;
        }
    }
}

function selectTrapezoidal() {
    let faildedCount = 0;
    while (true) {
        rest(getRandomInt(1000, 1200));
        const matchingResult = images.matchTemplate(captureScreen(), trapezoidal_image, {
            max: 1,
            region: [1700, 800, 160, 60],
        });
        if (
            matchingResult.matches !== undefined &&
            matchingResult.matches.length > 0 &&
            matchingResult.matches[0].similarity > 0.8
        ) {
            console.log("使用梯形阵");
            secureClick(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
            break;
        }

        if (faildedCount > 2) {
            console.log("未成功索敌");
            break;
        }

        faildedCount++;
    }
}

function waitForImage(data) {
    while (true) {
        rest(1500);
        const matchingResult = images.matchTemplate(captureScreen(), data.image, {
            max: 1,
            threshold: data.threshold || 0.8,
        });

        const matche = matchingResult.matches[0];
        if (matche && "secureClick" in data && data.secureClick) {
            secureClick(matche.point.x + 5, matche.point.y + 5);
            rest(2000);
            break;
        }
    }
}

function rest(time) {
    sleep(time);
    attempted_battles += time / 1000;
}

function receive_daily_reward() {
    rest(3000);
    const news = images.read("/mnt/shared/Pictures/news.png");

    const newsMatchingResult = images.matchTemplate(captureScreen(), news, {
        max: 1,
    });
    const newsMatche = newsMatchingResult.matches[0];
    if (newsMatche) {
        console.log("点击退出新闻");
        for (let index = 0; index < 5; index++) {
            secureClick(55, 64);
            rest(2000);

            const DailyRewardMatchingResult = images.matchTemplate(
                captureScreen(),
                receive_reward_image,
                {
                    max: 1,
                    region: [850, 650, 200, 100],
                }
            );
            const DailyRewardMatche = DailyRewardMatchingResult.matches[0];
            if (DailyRewardMatche) {
                console.log("领取每日奖励");

                secureClick(DailyRewardMatche.point.x + 5, DailyRewardMatche.point.y + 5);
                // 等待动画
                rest(2000);

                // 确认
                secureClick(951, 616);
                // 等待动画
                rest(getRandomInt(1500, 2000));

                getDailyRewardTimeStamp = new Date().getTime();
                break;
            }
        }
    } else {
        console.log("没有找到新闻");
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 对点击坐标进行微调，防止被识别为机器人
 * @param x
 * @param y
 */
function secureClick(x, y) {
    click(x + getRandomInt(1, 10), y + getRandomInt(1, 10));
}