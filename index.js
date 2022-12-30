function clickStart() {
	localStorage.setItem("startTime", new Date().getTime());
	urlData.seed = Math.floor(Math.random() * 100000);
	gotoUrl("./pages/start/intro", "");
}