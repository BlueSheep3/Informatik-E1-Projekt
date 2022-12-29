let achievList = [
	{
		name: "No Thank You",
		icon: "../../images/achiev_decline.png",
		desc: "Decline the Mission"
	},
	{
		name: "Quiz Extraordinaire",
		icon: "../../images/achiev_quiz.png",
		desc: "Get all 5 Questions in the Quiz correct"
	},
	{
		name: "Master Thief",
		icon: "../../images/decleration_of_independence.png",
		desc: "Steal the Decleration of Independance"
	},
	{
		name: "Mission Complete",
		icon: "../../images/achiev_mission_complete.png",
		desc: "Complete your Mission and get $1,000,000,000"
	},
	{
		name: "Completionist",
		icon: "../../images/achiev_all_endings.png",
		desc: "Get all Endings"
	}
]

window.onload = function() {
	let achievCount = 0;
	for(let i = 0; i < achievList.length; i++) {
		let achiev = achievList[i];
		let hasAchiev = localStorage.getItem("achiev: " + achiev.name) != null;

		createAchievObj(achiev, hasAchiev);
		if(hasAchiev) achievCount++;
	}

	let maxEndings = 9;
	let currentEndings = 0;
	for(let i = 0; i < maxEndings; i++) {
		if(localStorage.getItem("ending: " + i) != null)
			currentEndings++;
	}

	document.getElementById("achievCount").textContent =
		`${achievCount}/${achievList.length} Achievements Unlocked!`;
	document.getElementById("endingCount").textContent =
		`${currentEndings}/${maxEndings} Endings Found!`;
}

function createAchievObj(achiev, hasAchiev) {
	let div = document.createElement("div");
	div.classList.add("achievobj");
	if(hasAchiev) div.classList.add("hasachiev");

	let table = document.createElement("table");
	div.appendChild(table);
	let tr = document.createElement("tr");
	table.appendChild(tr);
	let td1 = document.createElement("td");
	td1.id = "icontd";
	let td2 = document.createElement("td");
	tr.appendChild(td1);
	tr.appendChild(td2);

	let img = document.createElement("img");
	img.src = achiev.icon;
	td1.appendChild(img);

	let title = document.createElement("p");
	title.id = "title";
	title.textContent = achiev.name;
	let desc = document.createElement("p");
	desc.id = "desc";
	desc.textContent = achiev.desc;
	td2.appendChild(title);
	td2.appendChild(desc);

	document.getElementById("achievlist").append(div);
}
