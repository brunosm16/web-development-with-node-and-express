const express = require('express');
const expressHandlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const setRoutes = require('./middlewares/set-routes');
const { credentials } = require('./config/config');

// eslint-disable-next-line no-console
console.log(credentials);

const app = express();

app.engine(
	'handlebars',
	expressHandlebars({
		defaultLayout: 'main',
	})
);
app.set('view engine', 'handlebars');
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
setRoutes(app);

module.exports = app;
