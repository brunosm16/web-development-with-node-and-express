const appDisable = (app) => {
	// Avoid giving information about the server to hackers
	app.disable('x-powered-by');
};

module.exports = appDisable;
