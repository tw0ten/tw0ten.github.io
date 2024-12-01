import notify from "./notify.js";

export const get = async (i = "localhost", h = {}) => {
	try {
		const response = await fetch(i, {
			headers: h,
		});
		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`);
		}
		return response.text();
	} catch (e) {
		return notify(`ERR\nGET '${i}'\n${e}`, 4000).innerText;
	}
};

export const post = async (i = "localhost", b = "", h = {}) => {
	try {
		const response = await fetch(i, {
			method: "POST",
			headers: h,
			body: b,
		});
		if (!response.ok) {
			throw new Error(`${response.status} ${response.statusText}`);
		}
		return response.text();
	} catch (e) {
		return notify(`ERR\nPOST '${i}'\n${e}`, 4000).innerText;
	}
};
