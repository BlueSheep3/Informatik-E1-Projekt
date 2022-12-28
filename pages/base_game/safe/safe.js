document.onkeydown = function(e) {
	if(e.key == " ") openSafe();
}

function openSafe() {
	document.getElementsByTagName("body")[0].style.backgroundImage
		= "url('../../../images/backgrounds/safe_open.png')";
	document.getElementById("doi").classList.remove("hidden");

	new Howl({
		src: ["../../../music/the_holy.mp3"],
		volume: 0.25,
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
