let explSnd = new Howl({
	src: ["../sounds/explosion.wav"],
	volume: 1
});

window.onload = function() {
	const urlParams = new URLSearchParams(window.location.search);
	if(urlParams.get("v") != null)
		console.log(urlParams.get("v"));
}

function clickButton() {
	document.getElementById("coolbutton").remove();
	document.getElementById("hiddentext").classList.remove("hidden");
	document.title = "You clicked the Button!";

	if(document.getElementById("soul") != null) {
		let pos = getObjPos("chara");
		if(pos.x > -17 && pos.x < 17 && pos.y > 35 && pos.y < 65)
			document.getElementById("soul").remove();
	}

	explode();
}

function explode() {
	let expl = document.createElement("img");
	expl.id = "explosion";
	expl.src = "../images/explosion.gif";
	expl.alt = "boom!";
	document.body.appendChild(expl);

	// document.getElementById("explSound").play();
	explSnd.play();

	setTimeout(function() { expl.remove(); }, 1000);
}

function testing() {
	let arr = ["hi", 5, 1.2, "nice"];
	let newLength = arr.push("elem index 4"); // insert end
	let hiText = arr.shift(); // remove first
	let elem4Text = arr.pop(); // remove last
	let newLength2 = arr.unshift("jehb"); // insert start

	// delete obj.prop;
	// obj.hasOwnProperty("someProp");
	// parseInt(s, b); parses s in base b
}

let input = {
	right: false,
	up: false,
	left: false,
	down: false
}

document.onkeydown = function(e) {
	let title = document.getElementById("title");
	title.textContent = "COOL TITLE: " + e.key;

	if(document.getElementById("soul") == null) return;

	if(e.key.toLowerCase() == "d") input.right = true;
	if(e.key.toLowerCase() == "w") input.up = true;
	if(e.key.toLowerCase() == "a") input.left = true;
	if(e.key.toLowerCase() == "s") input.down = true;

	if(e.key == "Enter" && document.getElementById("coolbutton") != null) {
		let pos = getObjPos("chara");
		if(pos.x > -22 && pos.x < 22 && pos.y > 42 && pos.y < 58) {
			document.getElementById("soul").remove();
			clickButton();
		}
	}
}

document.onkeyup = function(e) {
	if(e.key.toLowerCase() == "d") input.right = false;
	if(e.key.toLowerCase() == "w") input.up = false;
	if(e.key.toLowerCase() == "a") input.left = false;
	if(e.key.toLowerCase() == "s") input.down = false;
}

function frame() {
	if(document.getElementById("soul") == null) return;

	let pos = getObjPos("chara");

	if(input.right) pos.x += 1;
	if(input.left) pos.x -= 1;
	if(input.up) pos.y -= 1;
	if(input.down) pos.y += 1;

	setObjPos("chara", pos);
}

function getObjPos("chara") {
	let soul = document.getElementById("soul");
	let x = parseInt(soul.style.left.substring(0, soul.style.left.length - 2));
	let y = parseInt(soul.style.top.substring(0, soul.style.top.length - 2));
	return {x,y};
}

function setObjPos("chara", pos) {
	let soul = document.getElementById("soul");
	soul.style.left = pos.x + "vh";
	soul.style.top = pos.y + "vh";
}

window.onunload = function(event) {
	// window.location.href = window.location.href;
}

setInterval(frame, 20);

class SomeObject {
	constructor(x) {
		this.coolField = x;
	}

	get fieldMinusOne() {
		return this.coolField - 1;
	}

	set fieldMinusOne(newValue) {
		this.coolField = newValue + 1;
	}
}
