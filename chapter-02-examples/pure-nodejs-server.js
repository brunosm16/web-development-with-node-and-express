const http = require('http');

const PORT = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/plain' });
	res.end('Ending connection ...');
});

// eslint-disable-next-line no-console
server.listen(PORT, () => console.log(`Server is running at port : ${PORT}`));
