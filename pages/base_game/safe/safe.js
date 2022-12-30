window.onload = function() {
	if(urlData.act === "f") return;
	document.getElementById("codehelp").classList.remove("hidden");
	document.getElementById("code").classList.remove("hidden");
	document.getElementById("confirmcode").classList.remove("hidden");
}

window.onclick = function() {
	if(urlData.act === "f") openSafe();
}

function openSafe() {
	document.getElementsByTagName("body")[0].style.backgroundImage
		= "url('../../../images/backgrounds/safe_open.png')";
	document.getElementById("doi").classList.remove("hidden");
	document.getElementById("codehelp").classList.add("hidden");
	document.getElementById("code").classList.add("hidden");
	document.getElementById("confirmcode").classList.add("hidden");

	new Howl({
		src: ["../../../other assets/the_holy.mp3"],
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
	setAchiev("Master Thief", "../../../images/declaration_of_independence.png", "Steal the declaration of independence");

	setTimeout(() => gotoUrl("../../end/declaration_of_independence/declaration", ''), 5000);
}

function confirm() {
	let passwords = [
		"declerationofindependence",
		"",
		""
	];
	let rng = randomInt(urlData.seed, 8645, 3);
	let rngNum = (randomInt(urlData.seed, 4386, 10000) + "")[0];
	let correctCode = passwords[rng] + rngNum;
	let input = document.getElementById("code");
	if(input.value.trim().toLowerCase() !== "somecode") return;
	openSafe();
}
