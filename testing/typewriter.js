setInterval(updateText, 200);

function updateText() {
	let written = document.getElementById("written");
	let notWritten = document.getElementById("notwritten");
	let c = notWritten.textContent[0];

	if(notWritten.textContent.length == 0) return;

	written.textContent += c;
	notWritten.textContent = notWritten.textContent.substring(1);
}
