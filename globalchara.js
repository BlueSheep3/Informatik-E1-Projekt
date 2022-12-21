let input = { w: false, a: false, s: false, d: false };
let velocity = { x: 0, y: 0 };
let hasGravity = false;
let onGround = false;
let walls = [];
let triggers = [];

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

	if(inputVec.x > 0) {
		if(chara.classList.contains("mirrorX"))
			chara.classList.remove("mirrorX");
	}
	if(inputVec.x < 0) {
		if(!chara.classList.contains("mirrorX"))
			chara.classList.add("mirrorX");
	}

	let mag = Math.sqrt(inputVec.x ** 2 + inputVec.y ** 2);

	if(mag != 0) {
		velocity.x += inputVec.x * 0.65 / mag;
		velocity.y += inputVec.y * 0.65 / mag;
	}
	velocity.x *= 0.65;
	if(hasGravity) velocity.y += 0.5;
	else velocity.y *= 0.65;

	onGround = false;
	let pos = getCharaPos();

	let prevPos = {x: 0, y: 0};
	prevPos.x = pos.x;
	prevPos.y = pos.y;
	pos.x += velocity.x;
	pos.y += velocity.y;
	checkCollision(pos, prevPos);
	setCharaPos(pos);

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

function getCharaPos() {
	let chara = document.getElementById("chara");
	let x = parseFloat(chara.style.left.substring(0, chara.style.left.length - 2));
	let y = parseFloat(chara.style.top.substring(0, chara.style.top.length - 2));
	return {x,y};
}

function setCharaPos(pos) {
	let chara = document.getElementById("chara");
	chara.style.left = pos.x + "vh";
	chara.style.top = pos.y + "vh";
}
