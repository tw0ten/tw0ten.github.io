function notify(str, timeout = 2000) {
	if (timeout <= 0) return;
	const p = document.getElementById("notify");
	if (!p) {
		const el = document.createElement("div");
		el.id = "notify";
		document.body.appendChild(el);
		const style = document.createElement("style");
		style.innerText = `
#notify {
	top: 0;
	right: 0;
	position: fixed;
	background-color: transparent;
	max-width: 100%;
	word-break: break-all;
	z-index: 3;
}

#notify:hover {
	animation-play-state: paused;
}

@keyframes timeout {
	to {
		width: 0%;
	}
}

#notify > div {
	padding: 0.25em;
	margin: 0.25em;
	position: relative;
	animation-play-state: inherit;
	background-color: var(--bgc);
}

#notify > div > * {
	text-align: right;
}

#notify > div:hover::after {
	opacity: 0;
}

#notify > div::after {
	content: "";
	background-color: var(--fgc);
	width: 100%;
	height: 2px;
	transition: opacity 200ms linear;
	position: absolute;
	bottom: 0;
	left: 0;
	animation: timeout linear forwards;
	animation-duration: inherit;
	animation-play-state: inherit;
}
`;
		document.getElementsByTagName("head")[0].appendChild(style);
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
