hasGravity = true;
walls = [[-200,83,200,100], [80,0,100,100]];
triggers = [[-100,0,-30,100]];

function onTrigger(trigIndex) {
	gotoUrl("./numpad", "");
}