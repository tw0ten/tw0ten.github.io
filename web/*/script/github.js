import { get } from "./fetch.js";

export const fetchRepos = async (
	name = "tw0ten",
	timeout = 3000,
	retry = 0,
) => {
	if (retry < 0) return [];
	const l = await get(`https://api.github.com/users/${name}/repos`);
	if (l) return JSON.parse(l);
	await new Promise((r) => setTimeout(r, timeout));
	return fetchRepos(name, timeout, --retry);
};
