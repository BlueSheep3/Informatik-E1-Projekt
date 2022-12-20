let interval = null;
let hasStartedAnim = false;

window.onclick = startAnim;
window.onkeydown = startAnim;

function startAnim() {
	if(hasStartedAnim) return;
	hasStartedAnim = true;

	document.getElementById("pressbuttonhint").remove();

	const urlParams = new URLSearchParams(window.location.search);
	let speed = urlParams.get("speed") ?? 35;

	interval = setInterval(updateText, speed);
}

function updateText() {
	let written = document.getElementById("written");
	let notWritten = document.getElementById("notwritten");
	let c = notWritten.textContent[0];

	if(notWritten.textContent.length == 0) {
		if(interval != null) clearInterval(interval);
		document.getElementById("buttons").classList.remove("hidden");
		return;
	}

	if(c.trim() != "") {
		new Howl({
			src: ["../../sounds/text.wav"],
			volume: 0.5
		}).play();
	}
	written.textContent += c;
	notWritten.textContent = notWritten.textContent.substring(1);
}

function skipText() {
	let written = document.getElementById("written");
	let notWritten = document.getElementById("notwritten");
	if(notWritten.textContent == "") return;

	document.getElementById("buttons").classList.remove("hidden");
	written.textContent += notWritten.textContent;
	notWritten.textContent = "";
}

function swapButtons() {
	let ba = document.getElementById("buttonAccept");
	let bd = document.getElementById("buttonDecline");
	if(ba.classList.contains("swapped")) ba.classList.remove("swapped");
	else ba.classList.add("swapped");
	if(bd.classList.contains("swapped")) bd.classList.remove("swapped");
	else bd.classList.add("swapped");
}

document.onkeydown = function(e) {
	if(e.key != "Escape") return;
	if(interval != null) clearInterval(interval);
	skipText();
}