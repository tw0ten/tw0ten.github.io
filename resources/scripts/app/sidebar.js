const trans = 50;

let v = true;
let an = null;
let id = null;

function toggle() {
	const bar = document.getElementById("sidebar");
	const app = document.getElementById("app");
	const buttons = bar.children;
	v = !v;

	window.clearInterval(id);
	if (v) {
		bar.style.opacity = "1";
		bar.style.height = "100%";
		bar.style.visibility = "visible";
		bar.style.overflowY = "scroll";
		app.style.zIndex = "4";

		app.style.marginTop = "";
		app.style.position = "relative";
		app.style.left = "0";
		app.style.borderRadius = "1rem";
		app.style.zIndex = "0";

		an = 0;
		id = window.setInterval(function () {
			if (an < buttons.length) {
				buttons[an].style.transform = "";
				an++;
			} else {
				window.clearInterval(id);
			}
		}, trans);
	} else {
		an = buttons.length - 1;
		id = window.setInterval(function () {
			if (an > 0) {
				buttons[an].style.transform = "translateX(-200%)";
				an--;
			} else {
				bar.style.opacity = "0.75";
				bar.style.height = "0";
				bar.style.visibility = "hidden";
				bar.style.overflow = "visible";
				bar.style.zIndex = "1";

				app.style.left = "-3rem";
				app.style.marginTop = "6em";
				app.style.position = "fixed";
				app.style.borderRadius = "0rem";
				app.style.zIndex = "2";

				window.clearInterval(id);
			}
		}, trans);
	}
}
