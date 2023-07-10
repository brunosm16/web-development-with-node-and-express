const headersAreEmpty = (headers) => !headers || !Object.keys(headers)?.length;

const formatRequestHeaders = (headers) => {
	if (headersAreEmpty(headers)) return [];
	return Object.entries(headers).map(([key, value]) => `${key}: ${value}`);
};

module.exports = formatRequestHeaders;
