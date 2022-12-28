let urlData;

{
	const urlParams = new URLSearchParams(window.location.search);

	let data = urlParams.get("d") ?? "0";
	// let opt = urlParams.get("o");

	let itemDOI = parseInt(data[0]); // 0: no item, 1: has it, 2: has fake

	urlData = {
		seed: parseInt(urlParams.get("s") ?? "0"),
		data: {
			itemDOI: itemDOI
		},
		opt: {},
		act: urlParams.get("a") ?? ""
	};
}

let hasUsedGoto = false;
function gotoUrl(url, actions) {
	if(hasUsedGoto) return;
	let params = `?s=${urlData.seed}&d=${urlData.data.itemDOI}&o=&a=${actions}`;
	window.location.href = url + ".html" + params;
	hasUsedGoto = true;
}

function gotoStart(startUrl) {
	urlData.seed = 0;
	urlData.data = { itemDOI: 0 };
	gotoUrl(startUrl, "");
}

// why doesnt javascript have a seeded rng function?
function random(seed, salt) {
	return Math.abs(Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453 % 1);
}

function randomInt(seed, salt, max) {
	return Math.floor(random(seed, salt) * max);
}

function setHasClass(obj, className, condition) {
	if(condition) {
		if(!obj.classList.contains(className))
		obj.classList.add(className);
	} else {
		if(obj.classList.contains(className))
			obj.classList.remove(className);
	}
}

function setAchiev(achievName, achievIcon, achievDesc) {
	// if(localStorage.getItem("achiev: " + achievName) != null) return;
	// localStorage.setItem("achiev: " + achievName, "got");

	let div = document.createElement("div");
	div.classList.add("achiev");

	let table = document.createElement("table");
	div.appendChild(table);
	let tr = document.createElement("tr");
	table.appendChild(tr);
	let td1 = document.createElement("td");
	let td2 = document.createElement("td");
	tr.appendChild(td1);
	tr.appendChild(td2);

	let img = document.createElement("img");
	img.src = achievIcon;
	td1.appendChild(img);

	let title = document.createElement("p");
	title.id = "title";
	title.textContent = achievName;
	let desc = document.createElement("p");
	desc.id = "desc";
	desc.textContent = achievDesc;
	td2.appendChild(title);
	td2.appendChild(desc);

	document.getElementsByTagName("body")[0].append(div);

	setTimeout(() => div.classList.add("anim"), 50);
	setTimeout(() => div.classList.remove("anim"), 3000);
	setTimeout(() => div.remove(), 4000);
}
