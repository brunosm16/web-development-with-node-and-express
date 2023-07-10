const expressHandlebars = require('express-handlebars');

const setHandlebars = (app) => {
	app.engine(
		'handlebars',
		expressHandlebars({
			defaultLayout: 'main',
		})
	);
	app.set('view engine', 'handlebars');
};

module.exports = setHandlebars;
