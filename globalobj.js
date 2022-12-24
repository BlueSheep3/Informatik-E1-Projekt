let input = { w: false, a: false, s: false, d: false };
let velocity = { x: 0, y: 0 };
let hasGravity = false;
let onGround = false;
let walls = [];
let triggers = [];
let canTurnAround = true;

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

	if(input.a) inputVec.x--;
	if(input.d) inputVec.x++;
	if(!hasGravity) {
		if(input.w) inputVec.y--;
		if(input.s) inputVec.y++;
	}

	if(canTurnAround && inputVec.x != 0)
		setHasClass(chara, "mirrorX", inputVec.x < 0);

	velocity.x += inputVec.x * 0.65;
	velocity.y += inputVec.y * 0.65;
	velocity.x *= 0.65;
	if(hasGravity) velocity.y += 0.5;
	else velocity.y *= 0.65;

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
			if(typeof onTrigger !== "undefined") onTrigger(i);
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
