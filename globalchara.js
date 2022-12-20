let input = { w: false, a: false, s: false, d: false };
let velocity = { x: 0, y: 0 };
let hasGravity = false;
let groundHeight = 90;

document.onkeydown = function(e) {
	let c = e.key.toLowerCase();
	if("wasd".includes(c)) input[c] = true;
	if(c == " " && getCharaPos().y >= groundHeight) velocity.y = -4;
}

document.onkeyup = function(e) {
	let c = e.key.toLowerCase();
	if("wasd".includes(c)) input[c] = false;
}

setInterval(frame, 20);

function frame() {
	if(document.getElementById("chara") == null) return;

	let inputVec = { x: 0, y: 0 };

	if(input.a) inputVec.x--;
	if(input.d) inputVec.x++;
	if(!hasGravity) {
		if(input.w) inputVec.y--;
		if(input.s) inputVec.y++;
	}

	let mag = Math.sqrt(inputVec.x ** 2 + inputVec.y ** 2);

	if(mag != 0) {
		velocity.x += inputVec.x * 0.65 / mag;
		velocity.y += inputVec.y * 0.65 / mag;
	}
	velocity.x *= 0.65;
	if(hasGravity) velocity.y += 0.5;
	else velocity.y *= 0.65;

	let pos = getCharaPos();
	if(pos.y >= groundHeight && velocity.y > 0) velocity.y = 0;
	pos.x += velocity.x;
	pos.y += velocity.y;
	setCharaPos(pos);

	if(typeof frame2 !== "undefined")
		frame2();
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