const retry = images.read("/mnt/shared/Pictures/retry.png");

/**
 * quickGetReward 是否快速收获奖励
 * 因为每次到零点，快速收获奖励的判断会失效。所以如果需要长时间的挂机，建议关闭快速收获奖励
 */
function getReward(收获奖励, 远征完成, 确认, 出征, quickGetReward) {
    // 是否收获了奖励
    let getReward = false;
    // 申请截图权限(如果调用方和当前脚本都申请了截图权限，代码会在这里卡住。所以只在调用方申请截图权限)
    // requestScreenCapture(false);

    if (!quickGetReward) {
        quickGetReward = false;
        console.log("快速收获奖励关闭");
    }

    let matchingResult;

    matchingResult = images.matchTemplate(captureScreen(), retry, {
        max: 1,
    });
    if (matchingResult.matches !== undefined && matchingResult.matches.length > 0) {
        console.log("出现重试按钮，点击重试");
        click(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
        sleep(3000);
    }

    // 点击远征
    click(850, 50);
    sleep(2500);

    while (true) {

        if (!quickGetReward) {
            click(850, 50);
            sleep(2500);
            // click(350, 50);
            // sleep(2500);
            matchingResult = images.matchTemplate(captureScreen(), 收获奖励, {
                max: 1,
            });
            if (matchingResult.matches === undefined || matchingResult.matches.length === 0) {
                console.log("没有可收获的奖励");
                break;
            }
        }

        matchingResult = images.matchTemplate(captureScreen(), 收获奖励, {
            max: 1,
        });

        if (matchingResult.matches === undefined || matchingResult.matches.length === 0) {
            console.log("没有可收获的奖励-意外情况");
            break;
            // // 如果无收获奖励，检查是否有远程完成标志
            // // 应该不会出现这种情况
            // matchingResult = images.matchTemplate(captureScreen(), 章节结束, {
            //   max: 1,
            //   region: [100, 708, 200, 30],
            //   threshold: 0.8,
            // });

            // // 已经到达最后一章，结束
            // if (matchingResult.matches !== undefined && matchingResult.matches.length > 0) {
            //   console.log("章节结束, 结束收获奖励");
            //   break;
            // }

            // click(155, 720);
            // // 等待动画结束
            // sleep(2000);
        } else {
            matche = matchingResult.matches[0];

            console.log("收获奖励");
            click(matche.point.x + 5, matche.point.y + 5);
            getReward = true;

            // 等待动画结束
            sleep(2500);
            click(1000, 950);

            for (let index = 0; index < 3; index++) {
                sleep(2000);

                matchingResult = images.matchTemplate(captureScreen(), 确认, {
                    max: 1,
                });

                if (matchingResult.matches !== undefined && matchingResult.matches.length > 0) {
                    matche = matchingResult.matches[0];
                    click(matche.point.x + 5, matche.point.y + 5);
                    break;
                }
            }

            // 等待动画结束
            sleep(2000);
        }
    }

    console.log("准备出征");

    for (let i = 0; i < 3; i++) {
        matchingResult = images.matchTemplate(captureScreen(), 出征, {
            max: 1,
            region: [280, 10, 150, 100],
        });

        if (matchingResult.matches !== undefined && matchingResult.matches.length > 0) {
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
