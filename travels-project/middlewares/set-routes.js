const {
	STATUS_CODE_400,
	STATUS_CODE_500,
	STATUS_CODE_200,
} = require('../constants/http-status-codes');
const {
	HOMEPAGE_VIEW,
	ABOUT_VIEW,
	NOT_FOUND_VIEW,
	INTERNAL_SERVER_ERROR_VIEW,
} = require('../constants/views-names');
const { getRandomCity } = require('../lib/city-suggestion');
const renderView = require('../lib/route-handlers');

const API_PREFIX = '/travels';

const setRoutes = (app) => {
	app.get(`${API_PREFIX}/`, (req, res) =>
		renderView(req, res, HOMEPAGE_VIEW, STATUS_CODE_200, { suggestionCity: getRandomCity() })
	);

	app.get(`${API_PREFIX}/about`, (req, res) => renderView(req, res, ABOUT_VIEW, STATUS_CODE_200));

	app.use((req, res) => renderView(req, res, NOT_FOUND_VIEW, STATUS_CODE_400));

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) =>
		renderView(req, res, INTERNAL_SERVER_ERROR_VIEW, STATUS_CODE_500)
	);
};

module.exports = setRoutes;
