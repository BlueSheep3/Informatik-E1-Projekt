window.onload = function() {
	let hint = document.getElementById("hint");
	// let rng = randomInt(urlData.seed, 8645, 3);
	let hintTexts = [
		"The Password is someone who steals Things\nfollowed by the first digit of our Masterpin (without spaces).",
		// "It is one of our most prized possessions\nand the first digit of the master password (without spaces).",
		// "It is one of our most prized possessions\nand the first digit of the master password (without spaces)."
	];
	hint.textContent = hintTexts[0/* rng */];
}