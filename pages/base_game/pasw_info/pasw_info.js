window.onload = function() {
	// let rng = randomInt(urlData.seed, 4386, 10000);
	let hint = document.getElementById("hint");
	let rng = randomInt(urlData.seed, 8645, 3);
	let hintTexts = [
		"It is one of our most prized possessions and the first digit of the master password (without spaces).",
		"",
		""
	];
	hint.textContent = hintTexts[rng];
}