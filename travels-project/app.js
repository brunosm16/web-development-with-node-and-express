const express = require('express');
const expressHandlebars = require('express-handlebars');
const setRoutes = require('./middlewares/set-routes');

const app = express();

app.engine(
	'handlebars',
	expressHandlebars({
		defaultLayout: 'main',
	})
);
app.set('view engine', 'handlebars');

app.use(express.static(`${__dirname}/public`));

setRoutes(app);

module.exports = app;
