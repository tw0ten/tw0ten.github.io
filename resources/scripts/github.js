const ghn = "tw0ten";

async function loadRepos() {
	const rl = await fetch(`https://api.github.com/users/${ghn}/repos`);
	if (!rl.ok) return;
	const data = await rl.json();
	for (i in data) {
		if (data[i].fork) {
			const or = await fetch(
				`https://api.github.com/repos/${ghn}/${data[i].name}`
			);
			if (!or.ok) continue;
			data[i] = await or.json();
		}
	}
	return data;
}

async function fetchRepos() {
	let l = await loadRepos();
	if (l !== undefined) return l;
	await new Promise((r) => setTimeout(r, 1000));
	return await fetchRepos();
}
