function notify(str, timeout = 3500) {
	if (timeout <= 0) return;
	const p = document.getElementById("notify");
	if (!p) {
		const p = document.createElement("div");
		p.id = "notify";
		document.body.appendChild(p);
		const style = document.createElement("style");
		fetch("/!/style/notify.css").then((r) => {
			r.text().then((t) => {
				style.innerText = t;
				p.appendChild(style);
			}).catch((_) => {
				p.remove();
			});
		}).catch((_) => {
			p.remove();
		});
		return notify(str, timeout);
	}
	const el = document.createElement("div");
	const strs = str.split("\n");
	for (let s of strs) {
		let e = "p";
		if (s.length === 0) {
			e = "br";
		} else if (s.startsWith("##")) {
			e = "h3";
			s = s.substring(2, s.length);
		} else if (s.startsWith("#")) {
			e = "h4";
			s = s.substring(1, s.length);
		}
		const ne = document.createElement(e);
		ne.innerText += s;
		el.appendChild(ne);
	}
	el.style.animationDuration = timeout + "ms";
	el.onanimationend = el.remove;
	p.appendChild(el);
}
