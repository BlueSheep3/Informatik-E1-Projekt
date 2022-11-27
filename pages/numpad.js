let seed;

window.onload = function() {
	const urlParams = new URLSearchParams(window.location.search);
	if(urlParams.get("s") != null)
		seed = parseInt(urlParams.get("s"));
}

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
	let correctCode = seed ?? "69420";
	if(code.textContent == correctCode) {
		window.location.href = "../testing/testing.html";
	} else {
		code.style = "color: #b02020";
		setTimeout(() => {
			code.style = "";
		}, 500);
	}
}