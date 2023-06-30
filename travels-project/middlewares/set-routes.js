const { STATUS_CODE_400, STATUS_CODE_500 } = require('../constants/http-status-codes');

const NOT_FOUND_MESSAGE = '404 - Not found';
const INTERNAL_SERVER_ERROR_MESSAGE = '500 - Internal Server Error';
const TYPE_TEXT_PLAIN = 'text/plain';

const setRoutes = (app) => {
	app.use((req, res) => {
		res.type(TYPE_TEXT_PLAIN);
		res.status(STATUS_CODE_400);
		res.end(NOT_FOUND_MESSAGE);
	});

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => {
		res.type(TYPE_TEXT_PLAIN);
		res.status(STATUS_CODE_500);
		res.end(INTERNAL_SERVER_ERROR_MESSAGE);
	});
};

module.exports = setRoutes;
