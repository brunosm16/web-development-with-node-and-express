const express = require('express');
const expressHandlebars = require('express-handlebars');
const setRoutes = require('./middlewares/set-routes');

const PORT = process.env.PORT ?? 3000;

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

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
