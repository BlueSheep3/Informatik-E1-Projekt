let interval = setInterval(updateText, 100);
// 100 is the amount of time it repeats in milliseconds

function updateText() {
	// get spans and first character of notwritten span
	let written = document.getElementById("written");
	let notWritten = document.getElementById("notwritten");
	let c = notWritten.textContent[0];

	if(notWritten.textContent.length == 0) {
		clearInterval(interval); // stops the interval from repeating
		return;
	}

	// transfer character from notwritten to written
	written.textContent += c;
	notWritten.textContent = notWritten.textContent.substring(1);
}

// code to skip the text by pressing Escape
// remove if you dont want text to be skipable
function skipText() {
	let written = document.getElementById("written");
	let notWritten = document.getElementById("notwritten");

	// transfers all leftover text from notwritten to written
	written.textContent += notWritten.textContent;
	notWritten.textContent = "";
}

document.onkeydown = function(e) {
	if(e.key != "Escape") return; // dont do anything if pressed key isnt Escape
	if(interval != null) clearInterval(interval);
	skipText();
}