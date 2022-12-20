let urlData;

{
	const urlParams = new URLSearchParams(window.location.search);

	let seed = urlParams.get("s") ?? "0";
	let data = urlParams.get("d");
	let opt = urlParams.get("o");
	let act = urlParams.get("a");

	urlData = {
		seed: seed,
		data: {},
		opt: {},
		act: {}
	};
}

let hasUsedGoto = false;
function gotoUrl(url, actions) {
	if(hasUsedGoto) return;
	let params = `?s=${urlData.seed}&d=&o=&a=${actions}`;
	window.location.href = url + ".html" + params;
	hasUsedGoto = true;
}
