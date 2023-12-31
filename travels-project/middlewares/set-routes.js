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
const handlers = require('../lib/handlers');

const setTravelsRoutes = (app) => {
	app.get('/travels', (req, res) =>
		renderView(req, res, HOMEPAGE_VIEW, STATUS_CODE_200, { suggestionCity: getRandomCity() })
	);

	app.get(`/travels/about`, (req, res) => renderView(req, res, ABOUT_VIEW, STATUS_CODE_200));
};

const setNewsLetterRoutes = (app) => {
	app.get(`/newsletter/signup`, handlers.newsLetterSignUp);
	app.post(`/newsletter/signup/process-info`, handlers.newsLetterSignUpProcessInfo);
	app.get(`/newsletter/signup/thanks`, handlers.newsLetterThanks);
};

const setRoutes = (app) => {
	setTravelsRoutes(app);
	setNewsLetterRoutes(app);

	app.use((req, res) => renderView(req, res, NOT_FOUND_VIEW, STATUS_CODE_400));

	// eslint-disable-next-line no-unused-vars
	app.use((err, req, res, next) =>
		renderView(req, res, INTERNAL_SERVER_ERROR_VIEW, STATUS_CODE_500)
	);
};

module.exports = setRoutes;
