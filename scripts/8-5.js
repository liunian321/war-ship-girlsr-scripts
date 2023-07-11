//关键点
const title_image = images.read("/sdcard/images/8-5_title.png");
const go_to_war_image = images.read("/sdcard/images/go_to_war.png");
const go_back_image = images.read("/sdcard/images/go_back.png");
const start_fight_image = images.read("/sdcard/images/start_fight.png");
const advance_image = images.read("/sdcard/images/advance.png");
const abandon_image = images.read("/sdcard/images/abandon.png");
// 阵型
const trapezoidal_image = images.read("/sdcard/images/trapezoidal.png");
// 舰船图标
const ca_image = images.read("/sdcard/images/CA.png");

// 申请截图权限
requestScreenCapture(false);

while (true) {
	console.log("确认地图是否为8-5!");
	let matchingResult = images.matchTemplate(captureScreen(), title_image, {
		max: 1,
		region: [1460, 195, 185, 40],
	});
	if (matchingResult.matches === undefined || matchingResult.matches.length === 0) {
		console.log("不是8-5地图!");
		break;
	}

	let matche = matchingResult.matches[0];
	click(matche.point.x + 5, matche.point.y + 5);
	sleep(1200);

	matchingResult = images.matchTemplate(captureScreen(), go_to_war_image, {
		max: 1,
		region: [1570, 970, 220, 65],
	});

	// 开始出征
	matche = matchingResult.matches[0];
	click(matche.point.x + 5, matche.point.y + 5);

	// 等待出征动画
	for (let index = 0; index < 7; index++) {
		sleep(300);
		click(1000, 950);
	}

	waitForStartFight(1);

	console.log("检查敌方舰队是否为目标舰队");

	matchingResult = images.matchTemplate(captureScreen(), ca_image, {
		max: 1,
		region: [30, 650, 560, 150],
	});
	if (matchingResult.matches === undefined || matchingResult.matches.length === 0) {
		console.log("不是目标舰队，返回");
		click(1370, 980);
		sleep(1200);
		continue;
	}

	console.log("准备开始战斗");
	click(1645, 985);

	selectTrapezoidal();

	let abandon = false;
	sleep(17000);
	while (true) {
		click(1200, 600);
		sleep(500);

		// 如果没有点过放弃按钮，就检查是否需要放弃
		if (!abandon) {
			matchingResult = images.matchTemplate(captureScreen(), abandon_image, {
				max: 1,
				region: [1210, 670, 90, 60],
			});
			if (
				matchingResult.matches !== undefined &&
				matchingResult.matches.length > 0 &&
				matchingResult.matches[0].similarity > 0.8
			) {
				console.log("放弃战斗");
				click(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
				abandon = true;
				sleep(1500);
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
			click(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
			break;
		}
	}

	// 等待开始战斗按钮出现
	waitForStartFight(2);

	// 点击开始战斗
	click(1645, 985);
	selectTrapezoidal();
	sleep(25000);

	while (true) {
		console.log("确认战斗是否结束");
		matchingResult = images.matchTemplate(captureScreen(), title_image, {
			max: 1,
			region: [1460, 195, 185, 40],
		});
		if (
			matchingResult.matches !== undefined &&
			matchingResult.matches.length > 0 &&
			matchingResult.matches[0].similarity > 0.8
		) {
			break;
		}

		sleep(1200);
		click(200, 100);
	}
}

function waitForStartFight(flag) {
	let faildedCount = 0;
	while (true) {
		let matchingResult = images.matchTemplate(captureScreen(), start_fight_image, {
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
			click(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
			break;
		}
		faildedCount++;

		if (faildedCount > 5) {
			break;
		}
	}
}
