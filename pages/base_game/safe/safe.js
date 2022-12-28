window.onload = function() {
	if(urlData.act === "f") return;
	document.getElementById("codehelp").classList.remove("hidden");
	document.getElementById("mainnumpad").classList.remove("hidden");
}

window.onclick = function() {
	if(urlData.act === "f") openSafe();
}

function openSafe() {
	document.getElementsByTagName("body")[0].style.backgroundImage
		= "url('../../../images/backgrounds/safe_open.png')";
	document.getElementById("doi").classList.remove("hidden");
	document.getElementById("codehelp").classList.add("hidden");
	document.getElementById("mainnumpad").classList.add("hidden");

	new Howl({
		src: ["../../../music/the_holy.mp3"],
		volume: 0.5,
		loop: true
	}).play();
}

let clickedOnDOI = false;
function clickDOI() {
	if(clickedOnDOI) return;
	clickedOnDOI = true;

	let doi = document.getElementById("doi");
	doi.classList.add("remove");
	urlData.data.itemDOI = urlData.act === "f" ? 2 : 1;
	setTimeout(() => doi.remove(), 1000);
	setAchiev("Master Thief", "../../../images/decleration_of_independence.png", "Steal the Decleration of Independance");

	setTimeout(() => gotoUrl("../../end/decleration_of_independence/decleration", ''), 5000);
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
	// let correctCode = randomInt(urlData.seed, 4386, 10000);
	let correctCode = 69420; // TODO: change correct code
	if(code.textContent == correctCode) {
		openSafe();
	} else {
		code.style = "color: #b02020";
		setTimeout(() => {
			code.style = "";
		}, 500);
	}
}
