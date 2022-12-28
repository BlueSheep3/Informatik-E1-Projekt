function onClick(n) {
	let code = document.getElementById("code");
	if(code.textContent.length >= 6) return;
	code.textContent += n;
}

function onClickDelete() {
	let code = document.getElementById("code");
	if(code.textContent.length == 0) return;
	code.textContent = code.textContent.substring(0, code.textContent.length - 1);
}

function onClickConfirm() {
	let code = document.getElementById("code");
	let correctCode = randomInt(urlData.seed, 4386, 10000);
	if(code.textContent == correctCode) {
		gotoUrl("../testing/testing.html", "");
	} else {
		code.style = "color: #b02020";
		setTimeout(() => {
			code.style = "";
		}, 500);
	}
}

window.onload = function() {
	document.getElementById("codenote").textContent = randomInt(urlData.seed, 4386, 10000);
}