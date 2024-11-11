const get = async (i = "localhost", h = {}) => {
	try {
		const response = await fetch(i, {
			headers: h,
		});
		if (!response.ok) throw http_err(response.status);
		return await response.text();
	} catch (e) {
		return notify(`ERR\nGET '${i}'\n${e}`, 4000).innerText;
	}
};

const post = async (i = "localhost", b = "", h = {}) => {
	try {
		const response = await fetch(i, {
			method: "POST",
			headers: h,
			body: b,
		});
		if (!response.ok) throw http_err(response.status);
		return await response.text();
	} catch (e) {
		return notify(`ERR\nPOST '${i}'\n${e}`, 4000).innerText;
	}
};

const http_err = (code) => {
	const http_code_names = {
		// Informational
		100: "Continue",
		101: "Switching Protocols",
		102: "Processing",
		103: "Early Hints",
		// Success
		200: "OK",
		201: "Created",
		202: "Accepted",
		203: "Non-Authoritative Information",
		204: "No Content",
		205: "Reset Content",
		206: "Partial Content",
		207: "Multi-Status",
		208: "Already Reported",
		226: "IM Used",
		// Redirection
		300: "Multiple Choices",
		301: "Moved Permanently",
		302: "Found",
		303: "See Other",
		304: "Not Modified",
		307: "Temporary Redirect",
		308: "Permanent Redirect",
		// Client Error
		400: "Bad Request",
		401: "Unauthorized",
		402: "Payment Required",
		403: "Forbidden",
		404: "Not Found",
		405: "Method Not Allowed",
		406: "Not Acceptable",
		407: "Proxy Authentication Required",
		408: "Request Timeout",
		409: "Conflict",
		410: "Gone",
		411: "Length Required",
		412: "Precondition Failed",
		413: "Content Too Large",
		414: "URI Too Long",
		415: "Unsupported Media Type",
		416: "Range Not Satisfiable",
		417: "Expectation Failed",
		421: "Misdirected Request",
		422: "Unprocessable Content",
		423: "Locked",
		424: "Failed Dependency",
		425: "Too Early",
		426: "Upgrade Required",
		428: "Precondition Required",
		429: "Too Many Requests",
		431: "Request Header Fields Too Large",
		451: "Unavailable for Legal Reasons",
		// Server Error
		500: "Internal Server Error",
		501: "Not Implemented",
		502: "Bad Gateway",
		503: "Service Unavailable",
		504: "Gateway Timeout",
		505: "HTTP Version Not Supported",
		506: "Variant Also Negotiates",
		507: "Insufficient Storage",
		508: "Loop Detected",
		511: "Network Authentication Required",
	};

	return new Error(
		`${code} - ${http_code_names[code]}`,
	);
};
