// 关键点
const title_image = images.read("/sdcard/images/9_1_title.png");
const go_to_war_image = images.read("/sdcard/images/go_to_war.png");
const go_back_image = images.read("/sdcard/images/go_back.png");
const start_fight_image = images.read("/sdcard/images/start_fight.png");
const click_continue_image = images.read("/sdcard/images/click_continue.png");
// 阵型
const single_transverse_image = images.read("/sdcard/images/single_transverse.png");
// 舰船图标
const ss_image = images.read("/sdcard/images/ss-I.png");

// 申请截图权限
requestScreenCapture(false);
// console.log(device.width, device.height);

while (true) {
	console.log("确认地图是否为9-1");
	let matchingResult = images.matchTemplate(captureScreen(), title_image, {
		max: 1,
		region: [1460, 195, 185, 40],
	});
	let matche = matchingResult.matches[0];
	click(matche.point.x + 5, matche.point.y + 5);
	sleep(1500);

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
	while (true) {
		matchingResult = images.matchTemplate(captureScreen(), start_fight_image, {
			max: 1,
			region: [1630, 970, 195, 60],
		});
		if (
			matchingResult.matches !== undefined &&
			matchingResult.matches.length > 0 &&
			matchingResult.matches[0].similarity > 0.9
		) {
			break;
		}
		click(1000, 950);
		sleep(300);
	}

	console.log("检查敌方舰队是否为目标舰队");
	let screen_image = captureScreen();

	matchingResult = images.matchTemplate(screen_image, ss_image, {
		max: 1,
		region: [30, 650, 560, 150],
	});
	if (matchingResult.matches === undefined || matchingResult.matches.length === 0) {
		console.log("不是目标舰队，返回");
		click(1370, 980);
		sleep(1500);
		continue;
	}

	console.log("准备开始战斗");
	click(1645, 985);

	while (true) {
		sleep(1000);
		matchingResult = images.matchTemplate(captureScreen(), single_transverse_image, {
			max: 1,
			region: [1700, 980, 150, 60],
		});
		if (
			matchingResult.matches !== undefined &&
			matchingResult.matches.length > 0 &&
			matchingResult.matches[0].similarity > 0.8
		) {
			console.log("使用单横阵");
			click(matchingResult.matches[0].point.x + 10, matchingResult.matches[0].point.y + 10);
			break;
		}
	}

	sleep(15000);
	while (true) {
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
			click(matchingResult.matches[0].point.x + 5, matchingResult.matches[0].point.y + 5);
			sleep(1500);
			break;
		}
	}
}
