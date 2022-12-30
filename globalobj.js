let input = { w: false, a: false, s: false, d: false };
let velocity = { x: 0, y: 0 };
let hasGravity = false;
let onGround = false;
let walls = [];
let triggers = [];
let canTurnAround = true;
let speed = 0.65;
let friction = 0.65;

document.onkeydown = function(e) {
	let c = e.key.toLowerCase();
	if("wasd".includes(c)) input[c] = true;
	if(c == " " && hasGravity && onGround) velocity.y = -4;
}

document.onkeyup = function(e) {
	let c = e.key.toLowerCase();
	if("wasd".includes(c)) input[c] = false;
}

setInterval(frame, 20);

function frame() {
	let chara = document.getElementById("chara");
	if(chara == null) return;

	let inputVec = { x: 0, y: 0 };

	if(isTouching) {
		let difX = touchPos.x - getObjIdPos("chara").x;
		let difY = touchPos.y - getObjIdPos("chara").y;
		let mag = Math.sqrt(difX ** 2 + difY ** 2);
		if(mag != 0) {
			inputVec.x = difX / mag;
			if(!hasGravity) inputVec.y = difY / mag;
		}
	} else {
		if(input.a) inputVec.x--;
		if(input.d) inputVec.x++;
		if(!hasGravity) {
			if(input.w) inputVec.y--;
			if(input.s) inputVec.y++;
		}
	}

	if(canTurnAround && inputVec.x != 0)
		setHasClass(chara, "mirrorX", inputVec.x < 0);

	velocity.x += inputVec.x * speed;
	velocity.y += inputVec.y * speed;
	velocity.x *= friction;
	if(hasGravity) velocity.y += 0.5;
	else velocity.y *= friction;

	onGround = false;
	let pos = getObjIdPos("chara");

	let prevPos = {x: 0, y: 0};
	prevPos.x = pos.x;
	prevPos.y = pos.y;
	pos.x += velocity.x;
	pos.y += velocity.y;
	checkCollision(pos, prevPos);
	setObjIdPos("chara", pos);

	if(typeof frame2 !== "undefined")
		frame2();
}

function checkCollision(pos, prevPos) {
	for(let i = 0; i < walls.length; i++) {
		// col is a rect from (col[0],col[1]) to (col[2],col[3])
		let col = walls[i];
		if(pos.x >= col[0] && pos.x <= col[2] && pos.y >= col[1] && pos.y <= col[3]) {
			// chara is inside rect
			if(prevPos.x < col[0]) { pos.x = col[0] - 0.01; velocity.x = 0; }
			if(prevPos.x > col[2]) { pos.x = col[2] + 0.01; velocity.x = 0; }
			if(prevPos.y < col[1]) { pos.y = col[1] - 0.01; velocity.y = 0; onGround = true; }
			if(prevPos.y > col[3]) { pos.y = col[3] + 0.01; velocity.y = 0; }
		}
	}
	for(let i = 0; i < triggers.length; i++) {
		let trig = triggers[i];
		if(pos.x >= trig[0] && pos.x <= trig[2] && pos.y >= trig[1] && pos.y <= trig[3]) {
			// if(typeof onTrigger !== "undefined") onTrigger(i); // unused
			if(prevPos.x < trig[0] || prevPos.x > trig[2] || prevPos.y < trig[1] || prevPos.y > trig[3]) {
				if(typeof onTriggerEnter !== "undefined") onTriggerEnter(i);
			}
		}
	}
}

function getObjPos(obj) {
	let x = parseFloat(obj.style.left.substring(0, obj.style.left.length - 2));
	let y = parseFloat(obj.style.top.substring(0, obj.style.top.length - 2));
	return {x,y};
}

function getObjIdPos(objId) {
	return getObjPos(document.getElementById(objId));
}

function setObjPos(obj, pos) {
	obj.style.left = pos.x + "vh";
	obj.style.top = pos.y + "vh";
}

function setObjIdPos(objId, pos) {
	setObjPos(document.getElementById(objId), pos);
}

function spawnObj(objId, className, pos, sprite) {
	let div = document.createElement("div");
	div.id = "objDiv";
	let obj = document.createElement("img");
	if(objId != "") obj.id = objId;
	obj.src = sprite;
	obj.classList.add("obj");
	if(className != "") obj.classList.add(className);
	obj.style.left = pos.x + "vh";
	obj.style.top = pos.y + "vh";
	div.appendChild(obj);
	document.getElementsByTagName("body").item(0).prepend(div);
	return obj;
}

// mobile input handling
let isTouching = false;
let touchPos = {x: 0, y: 0};

document.addEventListener('touchstart', function(event) {
	isTouching = true;
	updateTouchPos(event);
});

document.addEventListener('touchend', function(event) {
	isTouching = false;
	updateTouchPos(event);
});

document.addEventListener('touchmove', function(event) {
	updateTouchPos(event);
});

function updateTouchPos(event) {
	let sumX = 0;
	let sumY = 0;
	let numTouches = event.touches.length;

	for(let i = 0; i < numTouches; i++) {
		sumX += event.touches[i].clientX;
		sumY += event.touches[i].clientY;
	}

	let viewWidth = document.documentElement.clientWidth;
	let viewHeight = document.documentElement.clientHeight;
	let ratio = viewWidth / viewHeight;

	touchPos = {
		x: 100 * ratio * ((sumX / numTouches) - viewWidth / 2) / viewHeight,
		y: 100 * (sumY / numTouches) / viewHeight
	};
}