const http = require('http');
const fs = require('fs/promises');

const PORT = process.env.PORT ?? 3000;

const HTTP_STATUS_CODE_200 = 200;
const TYPE_TEXT_HTML = 'text/html';
const TYPE_TEXT_PLAIN = 'text/plain';
const TYPE_IMAGE_PNG = 'img/png';
const DEFAULT_ERROR_MESSAGE = '500 - Internal Server Error';

const routes = {
	home: {
		routePath: '',
		name: 'HomePage',
		staticFile: 'home.html',
		statusCode: HTTP_STATUS_CODE_200,
		type: TYPE_TEXT_HTML,
	},
	about: {
		routePath: '/about',
		name: 'AboutPage',
		staticFile: 'about.html',
		statusCode: HTTP_STATUS_CODE_200,
		type: TYPE_TEXT_HTML,
	},
	notFound: {
		routePath: null,
		name: 'NotFoundPage',
		staticFile: 'not-found.html',
		statusCode: HTTP_STATUS_CODE_200,
		type: TYPE_TEXT_HTML,
	},
	logo: {
		routePath: '/logo',
		name: 'Logo Image',
		staticFile: 'img/logo.png',
		statusCode: HTTP_STATUS_CODE_200,
		type: TYPE_IMAGE_PNG,
	},
};

const normalizeURL = (url) => {
	const regex = /\/?(?:\?.*)?$/;
	return url?.replace(regex, '').toLowerCase();
};

const getRouteData = (url) => {
	const normalizedURL = normalizeURL(url);
	const [route] = Object.values(routes).filter(({ routePath }) => routePath === normalizedURL);
	return route ?? routes?.notFound;
};

const readRouteFile = async (file) => {
	const normalizedPath = `${__dirname}/public/${file}`;

	try {
		return fs.readFile(normalizedPath, { encoding: 'binary' });
	} catch (err) {
		return null;
	}
};

const appendDataToResponse = (responseData, fileData) => ({ ...responseData, data: fileData });

const responseError = () => ({
	statusCode: 500,
	type: TYPE_TEXT_PLAIN,
	data: DEFAULT_ERROR_MESSAGE,
});

const getResponseByURL = async (url) => {
	const routeData = getRouteData(url);

	const fileData = await readRouteFile(routeData?.staticFile);

	return fileData ? appendDataToResponse(routeData, fileData) : responseError();
};

const server = http.createServer(async (req, res) => {
	const { statusCode, type, data } = await getResponseByURL(req?.url);

	res.writeHead(statusCode, { 'Content-Type': type });
	res.end(data);
});

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
