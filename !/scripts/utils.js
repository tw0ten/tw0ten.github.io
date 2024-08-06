function shuffle(el) {
	const els = Array.from(el.children);
	while (el.firstChild) el.removeChild(el.firstChild);
	for (let i = els.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[els[i], els[j]] = [els[j], els[i]];
	}
	els.forEach((child) => el.appendChild(child));
}
