(() => {
	const sce = document.getElementById("schedule");
	const sc = [];

	function fetchSchedule() {
		sc.sort((d1, d2) => {
			return d1.date.getTime() - d2.date.getTime();
		});
	}

	function createSc(name, date) {
		const e = document.createElement("p");
		e.style.textAlign = "right";
		e.innerText = `${name} ${formatDate(date)}`;
		return {
			name: name,
			date: date,
			element: e,
		};
	}

	function formatDate(d, s = true) {
		return `[${d.getDay()}.${d.getDate().toString().padStart(2, "0")}/${
			(d.getMonth() + 1).toString().padStart(2, "0")
		}|${d.getHours().toString().padStart(2, "0")}:${
			d.getMinutes().toString().padStart(2, "0")
		}${s ? `:${d.getSeconds().toString().padStart(2, "0")}` : ""}]`;
	}

	function updateSchedule() {
		const d = new Date();
		const rmTime = 1 * 60 * 1000;
		while (sc.length > 0 && sc[0].date.getTime() + rmTime < d.getTime()) {
			sc.splice(0, 1);
		}
		sce.innerText = "";
		let add = false;
		const max = 4;
		const hlTime = 5 * 60 * 1000;
		for (c in sc) {
			if (c >= max) continue;
			if (sc[c].date.getTime() > d.getTime() && !add) {
				const e = document.createElement("p");
				e.innerText = formatDate(d);
				e.style.textAlign = "right";
				sce.appendChild(e);
				add = true;
			}
			if (sc[c].date.getTime() - hlTime < d.getTime()) {
				sc[c].element.style.color = "var(--acc)";
			}
			sce.appendChild(sc[c].element);
		}
		if (!add) {
			const e = document.createElement("p");
			e.innerText = formatDate(d, sc.length > 0);
			e.style.textAlign = "right";
			sce.appendChild(e);
		}
	}

	fetchSchedule();
	updateSchedule();
	setInterval(updateSchedule, 200);
})();
