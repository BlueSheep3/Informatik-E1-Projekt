canTurnAround = false;
walls = [[-100,86.5,100,100], [-100,0,100,38], [-100,0,-25,100], [25,0,100,100]];
triggers = [[100,100,100,100]];

let distance = 2000;
let randomCarXVel = -1.5;
let bullets = [];
let invincibilityTimer = 0;

window.onload = function() {
	setTimeout(policeShoot, 3000);
}

function frame2() {
	document.getElementById("distanceMeter").textContent = "Distance To Goal: " + distance + "m";
	distance -= 1;

	triggers = [];
	invincibilityTimer++;

	let randomCarPos = getObjIdPos("randomCar");
	randomCarPos.x += randomCarXVel;
	if(randomCarPos.x < -150) {
		randomCarPos.x = 150;
		randomCarPos.y = Math.random() * 48 + 40;
		randomCarXVel = Math.random() * 0.5 - 1.75;
	}
	setObjIdPos("randomCar", randomCarPos);
	triggers[0] = [randomCarPos.x - 24, randomCarPos.y - 12, randomCarPos.x + 24, randomCarPos.y + 12];

	if(randomCarPos.x < 20) {
		movePoliceCar(randomCarPos);
	}

	let pos = getObjIdPos("chara");
	setHasClass(document.getElementById("chara"), "front", pos.y > randomCarPos.y);

	for(let i = 0; i < bullets.length; i++) {
		let bulletPos = getObjPos(bullets[i].obj);
		bulletPos.x += Math.cos(bullets[i].angle) * 1.75;
		bulletPos.y += Math.sin(bullets[i].angle) * 1.75;
		setObjPos(bullets[i].obj, bulletPos);
		triggers.push([bulletPos.x - 14, bulletPos.y - 6, bulletPos.x + 14, bulletPos.y + 6]);
	}
}

function onTrigger(trigIndex) {
	if(invincibilityTimer < 5) {
		invincibilityTimer = 0;
		return;
	}
	if(trigIndex == 0) {
		// randomCar
		console.log("collided with randomCar");
	} else {
		// bullet
		console.log("collided with bullet");
		bullets[trigIndex - 1].obj.remove();
	}
	invincibilityTimer = 0;
}

function movePoliceCar(otherPos) {
	let policePos = getObjIdPos("policeCar");
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

	setTimeout(policeShoot, Math.random() * 5000 + 2000);
}
