hasGravity = true;
walls = [[-200,80,200,100], [81,0,100,100]];
triggers = [[-100,0,-79,100]];

function onTriggerEnter(trigIndex) {
	gotoUrl("../caught/caught", "");
}