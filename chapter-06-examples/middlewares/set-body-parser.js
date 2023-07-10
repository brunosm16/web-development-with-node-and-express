const bodyParser = require('body-parser');

const setBodyParser = (app) => app.use(bodyParser.json());

module.exports = setBodyParser;
