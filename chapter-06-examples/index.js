const express = require('express');
const setHandlebars = require('./middlewares/set-handlebars');
const appDisable = require('./middlewares/app-disable');
const formatRequestHeaders = require('./utils/format-request-headers');
const retrieveInfoData = require('./utils/retrieve-info-data');
const setBodyParser = require('./middlewares/set-body-parser');
const handlers = require('./handlers');
const getMockProducts = require('./mocks/get-mock-products');

const PORT = 3000;

const app = express();

setHandlebars(app);
setBodyParser(app);
appDisable(app);

app.get('/retrieve-headers', (req = {}, res = {}) => res.send(formatRequestHeaders(req?.headers)));
app.get('/about', (req, res) => res.render('about'));
app.get('/retrieve-info-data', (req, res) => res.render('retrieve-info-data', retrieveInfoData()));
app.get('/no-layout', (req, res) => res.render('no-layout', { layout: null }));
app.get('/customized-layout', (req, res) =>
	res.render('customized-layout', { layout: 'customized' })
);
app.get('/plain-text', (req, res) => {
	res.type('text/plain');
	res.send('Hey this is a plain text');
});
app.get('/display-form-data', (req, res) => res.render('display-form-data'));
app.get('/error-handler', (req, res) => res.status(500).render('error-handler'));
app.post('/process-form', handlers.processForm);
app.get('/get-products', (req, res) => res.json(getMockProducts()));
app.use((req, res) => res.status(404).render('404'));
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	// eslint-disable-next-line no-console
	console.error(`Internal Server Error Message: ${err?.message}`);
	res.status(500).render('error-handler', { errorMessage: 'Internal Server Error' });
});
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
