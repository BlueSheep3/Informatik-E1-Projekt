let speed = 35;
const urlParams = new URLSearchParams(window.location.search);
	if(urlParams.get("speed") != null)
		speed = urlParams.get("speed");

if(speed > 0)
	setInterval(updateText, speed);
else
	setTimeout(typeAllText, 5);

function updateText() {
	let written = document.getElementById("written");
	let notWritten = document.getElementById("notwritten");
	let c = notWritten.textContent[0];

	if(notWritten.textContent.length == 0) return;

	written.textContent += c;
	notWritten.textContent = notWritten.textContent.substring(1);
}

function typeAllText() {
	let written = document.getElementById("written");
	let notWritten = document.getElementById("notwritten");

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