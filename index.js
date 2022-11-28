function clickStart() {
	urlData.seed = Math.floor(Math.random() * 100000);
	gotoUrl("./pages/start/intro", "");
}