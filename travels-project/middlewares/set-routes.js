const {
	STATUS_CODE_400,
	STATUS_CODE_500,
	STATUS_CODE_200,
} = require('../constants/http-status-codes');

const NOT_FOUND_MESSAGE = '404 - Not found';
const INTERNAL_SERVER_ERROR_MESSAGE = '500 - Internal Server Error';
const HOMEPAGE_MESSAGE = 'Welcome to our travels agency';
const ABOUT_PAGE_MESSAGE = 'About our travels agency';
const TYPE_TEXT_PLAIN = 'text/plain';
const API_PREFIX = '/travels';

const sendResponse = (type, status, message, res) => {
	if (!res) throw new Error('Response was not provided');

	res.type(type);
	res.status(status);
	res.end(message);
};

const setRoutes = (app) => {
	app.get(`${API_PREFIX}/`, (req, res) =>
		sendResponse(TYPE_TEXT_PLAIN, STATUS_CODE_200, HOMEPAGE_MESSAGE, res)
	);

	app.get(`${API_PREFIX}/about`, (req, res) =>
		sendResponse(TYPE_TEXT_PLAIN, STATUS_CODE_200, ABOUT_PAGE_MESSAGE, res)
	);

	app.use((req, res) => sendResponse(TYPE_TEXT_PLAIN, STATUS_CODE_400, NOT_FOUND_MESSAGE, res));

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) =>
		sendResponse(TYPE_TEXT_PLAIN, STATUS_CODE_500, INTERNAL_SERVER_ERROR_MESSAGE, res)
	);
};

module.exports = setRoutes;
