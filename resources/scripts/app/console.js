let histindex = 0;
const history = [];

let fortunes = ["loading fortunes"];

class Cmd {
	names;
	desc;
	func;
	constructor(names, desc, func) {
		this.names = names;
		this.desc = desc;
		this.func = func;
	}
}

fetch("/resources/assets/fortunes")
	.then((response) => {
		if (!response.ok) {
			throw new Error("network response was not ok");
		}
		return response.text();
	})
	.then((data) => {
		fortunes = data.split("\n%\n");
	})
	.catch((error) => {
		fortunes = ["fortunes failed to load :("];
	});

class Span {
	text;
	onclick;
	constructor(text, onclick) {
		this.text = text;
		this.onclick = onclick;
	}
}

const cmds = [
	new Cmd(["fortune"], "print a random, hopefully interesting, adage", () => {
		out(fortunes[Math.floor(Math.random() * fortunes.length)]);
	}),
	new Cmd(
		["notify"],
		"test notifications <content.., timeout (ms)>",
		(args) => {
			notify(
				args.slice(0, -1).join(" ").replaceAll("\\n", "\n"),
				args[args.length - 1]
			);
		}
	),
	new Cmd(["echo", "print", "say"], "display a line of text", (args) => {
		out(args.join(" "));
	}),
	new Cmd(["clear"], "clear the console", () => {
		const children = document.getElementById("console").children;

		for (let i = children.length - 1; i >= 0; i--) {
			const child = children[i];
			if (child.id != "input") child.remove();
		}
	}),
	new Cmd(["help", "?"], "general information", () => {
		out(new Span("console"));
		out(
			"underlined text is ",
			new Span("clickable", () => {
				notify(
					"#congratulations\nyou just clicked the clickable text",
					1500
				);
			}),
			"."
		);
		out("use up and down arrows to traverse history.");
		nl();
		out("command list:");
		for (let i in cmds) {
			out(
				" ",
				new Span(cmds[i].names, () => {
					setinput(cmds[i].names[0]);
				}),
				": " + cmds[i].desc
			);
		}
	}),
];

function fromhist(i) {
	histindex = Math.max(Math.min(history.length, histindex + i), 0);
	if (histindex == history.length) {
		setinput("");
		return;
	}
	setinput(history[histindex]);
}

function submit() {
	const el = document.getElementById("infield");
	const cmd = el.value;
	el.value = "";
	const l = document.createElement("p");
	l.innerText = cmd;

	enter(document.getElementById("input").children[0].cloneNode(true));
	enter(l);
	enter(document.createElement("br"));
	process(cmd);
}

function process(cmd) {
	if (cmd.trim() == "") return;
	history.push(cmd);
	cmd = cmd.trim();
	histindex = history.length;
	const args = cmd.split(" ");
	for (let i in cmds) {
		for (let j in cmds[i].names) {
			if (cmds[i].names[j] == args[0]) {
				args.shift();
				cmds[i].func(args);
				return;
			}
		}
	}
	out('unknown command: "' + args[0] + '"');
}

function out(...s) {
	let o = document.createElement("p");
	for (let i in s) {
		if (s[i] instanceof Span) {
			let sp = document.createElement("span");
			sp.innerText = s[i].text;
			if (s[i].onclick != undefined) {
				sp.toggleAttribute("onclick");
				sp.onclick = s[i].onclick;
			}
			o.appendChild(sp);
			continue;
		}
		o.append(s[i]);
	}
	enter(o);
	nl();
}

function nl() {
	enter(document.createElement("br"));
}

function enter(el) {
	const console = document.getElementById("console");
	console.insertBefore(el, document.getElementById("input"));
	console.scrollTop = console.scrollHeight;
}

function setinput(s) {
	const input = document.getElementById("infield");
	input.value = s;
	input.selectionStart = input.selectionEnd = input.value.length;
}

function tab() {
	const input = document.getElementById("infield");
	const s = input.value;
}
