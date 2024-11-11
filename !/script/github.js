async function fetchRepos(name = "tw0ten", timeout = 3000, retry = 3) {
	if (retry < 0) return [];
	const l = await (async () => {
		const rl = await fetch(`https://api.github.com/users/${name}/repos`);
		if (!rl.ok) return;
		const data = await rl.json();
		for (const i in data) {
			if (data[i].fork) {
				const or = await fetch(
					`https://api.github.com/repos/${name}/${data[i].name}`,
				);
				if (!or.ok) continue;
				data[i] = await or.json();
			}
		}
		return data;
	})();
	if (l) return l;
	await new Promise((r) => setTimeout(r, timeout));
	return await fetchRepos(name, timeout, retry--);
}

export { fetchRepos };
