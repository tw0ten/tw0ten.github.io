(() => {
	const cmd = document.getElementById("cmd");
	const cmdin = cmd.children[0];
	const input = cmdin.children[1];

	input.onkeydown = (e) => {
		switch (e.keyCode) {
			case 13: {
				submit(input.value);
				setinput();
				break;
			}
			case 38: {
				e.preventDefault();
				histindex = Math.max(0, histindex - 1);
				setinput(history[histindex]);
				break;
			}
			case 40: {
				e.preventDefault();
				histindex = Math.min(history.length, histindex + 1);
				if (histindex === history.length) {
					setinput();
					break;
				}
				setinput(history[histindex]);
				break;
			}
		}
	};

	let histindex = 0;
	const history = [];

	const cmds = (() => {
		function mkcmd(name, desc, func) {
			return { "name": name, "desc": desc, "func": func };
		}

		return [
			mkcmd(
				["echo"],
				"display a line of text",
				(args) => {
					out(args.join(" "));
				},
			),
			mkcmd(
				["exit"],
				"exit the shell",
				(_args) => {
					cmd.parentNode.remove();
				},
			),
			mkcmd(
				["reset"],
				"reload",
				(_args) => {
					location.reload();
				},
			),
			mkcmd(
				["cowsay"],
				"speaking cow",
				(args) => {
					const ls = args.join(" ").split("\\n");
					const l = Math.max(...ls.map((e) => e.length));
					const s = ls.map((i) => `| ${i.padEnd(l)} |`).join("\n");
					out(` _${"_".repeat(l)}_
${s}
 -${"-".repeat(l)}-
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`);
				},
			),
			mkcmd(
				["clear"],
				"clear the terminal screen",
				(_args) => {
					for (let i = 0; i < cmd.children.length; i++) {
						const e = cmd.children[i];
						if (e === cmdin) continue;
						e.remove();
						i--;
					}
				},
			),
			mkcmd(
				["help", "?"],
				"help",
				(_args) => {
					out("commands:");
					for (const i of cmds) {
						out(
							" ",
							{
								"text": i.name,
								"action": () => {
									setinput(i.name[0]);
								},
							},
							": " + i.desc,
						);
					}
				},
			),
		];
	})();

	function submit(i = "") {
		const l = document.createElement("p");
		l.innerText = i;
		enter(cmdin.children[0].cloneNode(true));
		enter(l);
		enter();
		process(i);
	}

	function process(i = "") {
		i = i.trim();
		if (i.length === 0) return;
		history.push(i);
		histindex = history.length;
		const args = i.split(" ");
		for (const i of cmds) {
			for (const name of i.name) {
				if (name === args[0]) {
					args.shift();
					i.func(args);
					return;
				}
			}
		}
		out('unknown command: "' + args[0] + '"');
	}

	function out(...s) {
		const o = document.createElement("p");
		for (const i of s) {
			if (i.action !== undefined) {
				const sp = document.createElement("span");
				sp.innerText = i.text;
				sp.toggleAttribute("onclick");
				sp.onclick = i.action;
				o.appendChild(sp);
				continue;
			}
			o.append(i);
		}
		enter(o);
		enter();
	}

	function enter(el = document.createElement("br")) {
		cmd.insertBefore(el, cmdin);
	}

	function setinput(s = "") {
		input.value = s;
		input.selectionStart = input.selectionEnd = input.value.length;
		input.focus();
		input.scrollIntoView();
	}
})();
