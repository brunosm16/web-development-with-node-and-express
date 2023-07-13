const express = require('express');
const expressHandlebars = require('express-handlebars');
const setRoutes = require('./middlewares/set-routes');
const weatherMiddleware = require('./middlewares/weather');

const app = express();

app.engine(
	'handlebars',
	expressHandlebars({
		defaultLayout: 'main',
	})
);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));
app.use(weatherMiddleware);

setRoutes(app);

module.exports = app;
