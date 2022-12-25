hasGravity = true;
walls = [[-200,80,200,100], [81,0,100,100], [-100,0,-80,100]];
triggers = [[-100,0,-79,100]];

function onTrigger(trigIndex) {
	gotoUrl("../caught/caught", "");
}