async function notify(str, timeout = 2000) {
	if(timeout<=0) return;
	const p = document.getElementById("notify");
	if (!p) {
		const el = document.createElement("div");
		el.id = "notify";
		document.body.appendChild(el);
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = "/resources/styles/notify.css";
		link.media = "all";
		document.getElementsByTagName("head")[0].appendChild(link);
		return notify(str, timeout);
	}
	const el = document.createElement("div");
	const strs = str.split("\n");
	for (let s of strs) {
		let e = "p";
		if (s == "") {
			e = "br";
		} else if (s.startsWith("##")) {
			e = "h2";
			s = s.substring(2, s.length);
		} else if (s.startsWith("#")) {
			e = "h3";
			s = s.substring(1, s.length);
		}
		const ne = document.createElement(e);
		ne.innerText += s;
		el.appendChild(ne);
	}
	el.style.animationDuration = timeout + "ms";
	el.onanimationend = () => {
		p.removeChild(el);
	};
	p.appendChild(el);
}
