canTurnAround = false;
walls = [[-100,86.5,100,100], [-100,0,100,38], [-100,0,-25,100], [25,0,100,100]];
triggers = [[100,100,100,100]];

let distance = 2000;
let randomCarXVel = -1.75;
let bullets = [];
let invincibilityTimer = 0;
let carSpeed = 0.9;

window.onload = function() {
	setTimeout(policeShoot, 3000);
}

let hasUsedGoto = false;
function frame2() {
	document.getElementById("distanceMeter").textContent = "Distance To Goal: " + Math.round(distance) + "m";
	distance -= carSpeed;
	carSpeed += 0.0003;
	if(carSpeed > 1.5) carSpeed = 1.5;

	if(distance <= 0) {
		if(!hasUsedGoto) {
			if(urlData.data.itemDOI == 1)
				gotoUrl("./end/end", "");
			else
				gotoUrl("./fake/fake", "");
		}
		hasUsedGoto = true;
	}

	triggers = [];
	invincibilityTimer++;

	let randomCarPos = getObjIdPos("randomCar");
	randomCarPos.x += randomCarXVel;
	if(randomCarPos.x < -150) {
		randomCarPos.x = 150;
		randomCarPos.y = Math.random() * 48 + 40;
		randomCarXVel = Math.random() * 0.8 - 2.1;
	}
	setObjIdPos("randomCar", randomCarPos);
	triggers[0] = [randomCarPos.x - 28, randomCarPos.y - 16, randomCarPos.x + 28, randomCarPos.y + 16];

	movePoliceCar(randomCarPos);

	let pos = getObjIdPos("chara");
	setHasClass(document.getElementById("chara"), "front", pos.y > randomCarPos.y);

	for(let i = 0; i < bullets.length; i++) {
		let bulletPos = getObjPos(bullets[i].obj);
		bulletPos.x += Math.cos(bullets[i].angle) * 1.75;
		bulletPos.y += Math.sin(bullets[i].angle) * 1.75;
		setObjPos(bullets[i].obj, bulletPos);
		triggers.push([bulletPos.x - 16, bulletPos.y - 8, bulletPos.x + 16, bulletPos.y + 8]);
	}
}

function onTrigger(trigIndex) {
	if(invincibilityTimer < 5) {
		invincibilityTimer = 0;
		return;
	}
	if(trigIndex !== 0) bullets[trigIndex - 1].obj.remove();

	let chara = document.getElementById("chara");

	chara.classList.add("shake");
	setTimeout(() => chara.classList.remove("shake"), 750);
	carSpeed -= 0.2;
	invincibilityTimer = 0;

	new Howl({
		src: ["../../sounds/carhit.wav"],
		volume: 0.5
	}).play();

	if(carSpeed < 0.5) {
		gotoUrl("./car_chase_caught/caught", "");
	}
}

function movePoliceCar(otherPos) {
	let policePos = getObjIdPos("policeCar");
	
	policePos.x = -35 * carSpeed - 35;

	if(otherPos.x > 20) {
		setObjIdPos("policeCar", policePos);
		return;
	}

	if(otherPos.y > 60) {
		if(policePos.y > 48) {
			policePos.y -= 1;
		}
	} else {
		if(policePos.y < 80) {
			policePos.y += 1;
		}
	}
	setObjIdPos("policeCar", policePos);
}

function policeShoot() {
	let pos = getObjIdPos("chara");
	let policePos = getObjIdPos("policeCar");

	let angle = Math.atan2(pos.y - policePos.y, pos.x - policePos.x);
	let bulletPos = {x: policePos.x, y: policePos.y};
	let bullet = spawnObj("", "bullet", bulletPos, "../../images/bullet.png");
	bullet.style.transform = "rotate(" + angle + "rad)";
	bullets.push({obj: bullet, angle: angle});

	setTimeout(policeShoot, Math.random() * 2500 + 500);

	new Howl({
		src: ["../../sounds/shoot.wav"],
		volume: 0.25
	}).play();
}
