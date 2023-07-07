const portfinder = require('portfinder');
const puppeteer = require('puppeteer');
const app = require('../app');

describe('Testing pages navigation', () => {
	let port = null;
	let homepagePath = null;
	let server = null;

	beforeEach(async () => {
		port = await portfinder.getPortPromise();
		server = app.listen(port);
		homepagePath = `http://localhost:${port}/travels`;
	});

	afterEach(() => {
		server.close();
	});

	it('should redirect from home-page to about-page', async () => {
		const anchorEl = '[data-test-id="about"]';
		const aboutPagePath = `${homepagePath}/about`;

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();

		await page.goto(homepagePath);

		await Promise.all([page.waitForNavigation(), page.click(anchorEl)]);

		await expect(page.url()).toEqual(aboutPagePath);
		await browser.close();
	});
});
