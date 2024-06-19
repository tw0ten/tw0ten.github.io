const mobile =
	/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
		navigator.userAgent
	);

const maxamount = mobile ? 0 : 256;
const nodedistance = 80;
const golSize = mobile ? 8 : 10;
const ftime = mobile ? 100 : 30;

let nodes = [];
let time = 0;
let tick = 5000 + 1;
let canvas;
let ctx;
let gol;

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

class CNode {
	x;
	y;
	velx;
	vely;
	size;
	color;

	constructor(x, y, velx, vely) {
		this.x = x;
		this.y = y;
		this.velx = velx;
		this.vely = vely;
		this.size = 0.5 + Math.random() * 2;
		this.color = `rgba(${randCol()}, 0.5)`;
	}

	tick(w, h) {
		this.x += this.velx;
		this.x =
			((this.x + w + nodedistance * 3) % (w + nodedistance * 2)) -
			nodedistance;
		this.y += this.vely;
		this.y =
			((this.y + h + nodedistance * 3) % (h + nodedistance * 2)) -
			nodedistance;
	}
}

function randCol() {
	return `${Math.floor(Math.random() * 255)},${Math.floor(
		Math.random() * 255
	)},${Math.floor(Math.random() * 255)}`;
}

function drawbg() {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;

	let offset = 400;
	ctx.fillStyle = "#202020";
	let col = 30;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	while (offset > 0) {
		offset -= 80 + Math.random() * 20;
		col = (offset / 400) * 30;
		ctx.fillStyle = `rgb(${col}, ${col}, ${col})`;
		ctx.fillRect(
			canvas.width / 2 - offset,
			canvas.height / 2 - offset,
			offset * 2,
			offset * 2
		);
	}
}

function golalive() {
	let a = 0;

	for (let i = 0; i < gol.length; i++) {
		for (let j = 0; j < gol[i].length; j++) {
			if (gol[i][j]) a++;
		}
	}

	return a;
}

function tickgol() {
	let golCopy = new Array(
		(canvas.width - (canvas.width % golSize) + golSize) / golSize
	);
	for (let i = 0; i < golCopy.length; i++) {
		golCopy[i] = new Array(
			(canvas.height - (canvas.height % golSize) + golSize) / golSize
		);
	}

	let wth = Math.min(golCopy.length, gol.length);
	let hth = Math.min(golCopy[0].length, gol[0].length);

	for (let x = 0; x < wth; x++) {
		for (let y = 0; y < hth; y++) {
			let neighbours = 0;

			for (let i = -1; i < 2; i++) {
				for (let j = -1; j < 2; j++) {
					if (i == 0 && j == 0) continue;

					if (gol[(x + i + wth) % wth][(y + j + hth) % hth])
						neighbours++;
				}
			}

			if (gol[x][y]) {
				golCopy[x][y] = neighbours == 2 || neighbours == 3;
			} else {
				golCopy[x][y] = neighbours == 3;
			}
		}
	}
	if (golCopy.length > gol.length || golCopy[0].length > gol[0].length) {
		gol = golCopy;
		fillgol();
		return;
	}
	gol = golCopy;
}

function fillgol() {
	for (let i = 0; i < gol.length; i++) {
		for (let j = 0; j < gol[i].length; j++) {
			gol[i][j] = Math.round(Math.random());
		}
	}
}

function tickbg(timestamp) {
	if (!canvas) {
		canvas = document.getElementById("canvas");
		if (!canvas) {
			window.requestAnimationFrame(tickbg);
			return;
		}
		ctx = canvas.getContext("2d");
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;
		gol = new Array(
			(canvas.width - (canvas.width % golSize) + golSize) / golSize
		);
		for (let i = 0; i < gol.length; i++) {
			gol[i] = new Array(
				(canvas.height - (canvas.height % golSize) + golSize) / golSize
			);
		}
	}
	if (time + ftime > timestamp) {
		window.requestAnimationFrame(tickbg);
		return;
	}

	tick++;
	time += ftime;

	if (time + ftime * 15 < timestamp) time = timestamp;

	drawbg();
	if (tick % 4 == 0) tickgol();

	if (tick > 5000) {
		tick = 0;
		nodes = [];
		fillgol();
	}

	if (nodes.length < maxamount)
		nodes.push(
			new CNode(
				canvas.width / 2,
				canvas.height / 2,
				Math.random() * 10 - 5,
				Math.random() * 10 - 5
			)
		);

	for (n in nodes) {
		nodes[n].tick(canvas.width, canvas.height);
		ctx.fillStyle = nodes[n].color;
		ctx.beginPath();
		ctx.arc(nodes[n].x, nodes[n].y, nodes[n].size * 2, 0, 2 * Math.PI);
		ctx.fill();
	}

	for (n in nodes) {
		for (n1 in nodes) {
			if (n1 == n) {
				continue;
			}
			let d = Math.abs(
				distance(nodes[n1].x, nodes[n1].y, nodes[n].x, nodes[n].y)
			);
			if (d <= nodedistance) {
				ctx.strokeStyle = nodes[n1].color;
				ctx.lineWidth = (nodes[n1].size + nodes[n].size) / 2;
				ctx.beginPath();
				ctx.moveTo(nodes[n1].x, nodes[n1].y);
				ctx.lineTo(
					(nodes[n1].x + nodes[n].x) / 2,
					(nodes[n1].y + nodes[n].y) / 2
				);
				ctx.stroke();
			}
		}
	}

	for (let x = 0; x < gol.length; x++) {
		for (let y = 0; y < gol[x].length; y++) {
			if (gol[x][y]) {
				ctx.fillStyle = `rgba(${randCol()},0.5)`;
				ctx.fillRect(x * golSize, y * golSize, golSize, golSize);
			}
		}
	}
	window.requestAnimationFrame(tickbg);
}

window.requestAnimationFrame(tickbg);
