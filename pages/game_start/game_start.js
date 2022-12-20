hasGravity = true;
groundHeight = 83;

function frame2() {
	if(getCharaPos().x < -30) {
		gotoUrl("./numpad", "");
	}
}