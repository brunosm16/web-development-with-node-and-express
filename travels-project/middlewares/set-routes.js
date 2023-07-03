const { faker } = require('@faker-js/faker');
const { STATUS_CODE_400, STATUS_CODE_500 } = require('../constants/http-status-codes');

const HOMEPAGE_VIEW = 'home';
const ABOUT_VIEW = 'about';
const NOT_FOUND_VIEW = '404';
const INTERNAL_SERVER_ERROR_VIEW = '500';
const API_PREFIX = '/travels';

const sendResponse = (view, res, status = null) => {
	if (!res) throw new Error('Response was not provided');
	if (status) res.status(status);

	res.render(view, { suggestionCity: faker.location.city() });
};

const setRoutes = (app) => {
	app.get(`${API_PREFIX}/`, (req, res) => sendResponse(HOMEPAGE_VIEW, res));

	app.get(`${API_PREFIX}/about`, (req, res) => sendResponse(ABOUT_VIEW, res));

	app.use((req, res) => sendResponse(NOT_FOUND_VIEW, res, STATUS_CODE_400));

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) => sendResponse(INTERNAL_SERVER_ERROR_VIEW, res, STATUS_CODE_500));
};

module.exports = setRoutes;
