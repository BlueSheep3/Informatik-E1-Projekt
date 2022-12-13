let input = { w: false, a: false, s: false, d: false };
let velocity = { x: 0, y: 0 };
let hasGravity = false;

document.onkeydown = function(e) {
	let c = e.key.toLowerCase();
	if("wasd".includes(c)) input[c] = true;
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
		velocity.x += inputVec.x * 0.55 / mag;
		velocity.y += inputVec.y * 0.55 / mag;
	}
	velocity.x *= 0.7;
	velocity.y *= 0.7;

	let pos = getCharaPos();
	pos.x += velocity.x;
	pos.y += velocity.y;
	setCharaPos(pos);
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