let achievList = [
	{
		name: "No Thank You",
		icon: "../../images/soul.png",
		desc: "Decline the Mission"
	},
	{
		name: "Master Thief",
		icon: "../../images/soul.png",
		desc: "Steal the Decleration of Independance"
	},
	{
		name: "Completionist",
		icon: "../../images/soul.png",
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
	document.getElementById("achievCount").textContent =
		`${achievCount}/${achievList.length} Achievements Unlocked!`;
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

let tryDelete = false;
function deleteSavedata() {
	let button = document.getElementById("deletesavedata");

	if(!tryDelete) {
		button.textContent = "ARE YOU SURE?";
		tryDelete = true;
		setTimeout(() => {
			button.textContent = "DELETE SAVEDATA";
			tryDelete = false;
		}, 5000);
		return;
	}

	localStorage.clear();
	button.textContent = "DELETE SAVEDATA";
	tryDelete = false;
}