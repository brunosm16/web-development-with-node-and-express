const express = require('express');
const setRoutes = require('./middlewares/set-routes');

const PORT = process.env.PORT ?? 3000;

const app = express();

setRoutes(app);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running at port : ${PORT}`));
