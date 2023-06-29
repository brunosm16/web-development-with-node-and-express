const http = require('http');

const PORT = process.env.PORT ?? 3000;

const HOME_ROUTE_NAME = 'Homepage';
const NOT_FOUND_ROUTE_NAME = 'Not Found';
const ABOUT_PAGE_NAME = 'About Page';

const ABOUT_PAGE_PATH = '/about';

const getCurrentPathByURL = (url) => {
	if (url === '') return HOME_ROUTE_NAME;
	if (url === ABOUT_PAGE_PATH) return ABOUT_PAGE_NAME;
	return NOT_FOUND_ROUTE_NAME;
};

const getRouteByURL = (url) => {
	const regex = /\/?(?:\?.*)?$/;
	const normalizedURL = url?.replace?.(regex, '')?.toLowerCase();

	return {
		statusCode: 200,
		type: 'text/plain',
		currentPath: getCurrentPathByURL(normalizedURL),
	};
};

const startServer = () => {
	const server = http.createServer((req, res) => {
		const { statusCode, type, currentPath } = getRouteByURL(req?.url);

		res.writeHead(statusCode, { 'Content-type': type });
		res.end(currentPath);
	});

	// eslint-disable-next-line no-console
	server.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
};

startServer();
