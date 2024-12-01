import { get } from "./fetch.js";

const id = "notify";
const css = "/*/style/notify.css";

const setup = (p) => {
	p.id = id;
	document.body.appendChild(p);
	get(css).then((r) => {
		const style = document.createElement("style");
		style.innerText = r;
		p.appendChild(style);
	}).catch(() => p.remove());
};

export default (str = "ERR\n#title\nbody", timeout = 3500) => {
	let p = document.getElementById(id);
	if (!p) {
		p = document.createElement("div");
		setup(p);
	}
	p.style.display = "none";
	const el = document.createElement("div");
	el.style.animationDuration = `${timeout}ms`;
	el.onanimationend = el.remove;
	if (str.startsWith("INF\n")) {
		el.style.color = "var(--acc)";
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
