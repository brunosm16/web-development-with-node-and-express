const express = require('express');

const PORT = 3000;

const app = express();

const formatHeaders = (headers) => {
	const keyValueHeaders = Object.keys(headers).map((key) => {
		const value = headers[key];

		return `${key}: ${value}`;
	});

	return keyValueHeaders;
};

app.get('/retrieve-headers', (req, res) => {
	const { headers } = req;

	const formattedHeaders = formatHeaders(headers);

	res.send(formattedHeaders);
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
