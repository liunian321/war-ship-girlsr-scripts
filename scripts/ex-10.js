const sortie_prepare = images.read("/sdcard/images/sortie_prepare.png");
const go_to_war_image = images.read("/sdcard/images/go_to_war.png");
const start_fight_image = images.read("/sdcard/images/start_fight.png");
const abandon_image = images.read("/sdcard/images/abandon.png");
const go_back_image = images.read("/sdcard/images/go_back.png");
// 阵型
const trapezoidal_image = images.read("/sdcard/images/trapezoidal.png");

// 申请截图权限
requestScreenCapture(false);

while (true) {
	let matchingResult = images.matchTemplate(captureScreen(), sortie_prepare, {
		max: 1,
		region: [1440, 850, 380, 120],
	});

	console.log("出击准备");
	let matche = matchingResult.matches[0];
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
	sleep(2000);

	// 选择梯形阵
	selectTrapezoidal();

	sleep(20000);
	while (true) {
		click(1200, 600);
		sleep(1000);
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
			click(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
			sleep(1500);
			break;
		}
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
