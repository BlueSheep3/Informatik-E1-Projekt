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
