let notify = (str, timeout = 3500) => {
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
	p.style.display = "none";
	const el = document.createElement("div");
	el.style.animationDuration = timeout + "ms";
	el.onanimationend = el.remove;
	if (str.startsWith("OK \n")) {
		el.style.color = "#00AA00";
		str = str.substring(4, str.length);
	} else if (str.startsWith("ERR\n")) {
		el.style.color = "#FF0000";
		str = str.substring(4, str.length);
	}
	for (let s of str.split("\n")) {
		let e = "p";
		if (s.length === 0) {
			e = "br";
		} else if (s.startsWith("#")) {
			e = "h4";
			s = s.substring(1, s.length);
		}
		const ne = document.createElement(e);
		ne.innerText += s;
		el.appendChild(ne);
	}
	p.appendChild(el);
	return el;
};
