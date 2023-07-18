/* eslint-disable no-console */
const { faker } = require('@faker-js/faker');
const { STATUS_CODE_303 } = require('../constants/http-status-codes');

const newsLetterSignUp = (req, res) => {
	res.render('newsletter-signup', { fakeSecret: faker.string.uuid() });
};

const newsLetterSignUpProcessInfo = (req, res) => {
	const { body, query } = req;

	console.log(`Fake secret:  ${body?.fakeSecret}`);
	console.log(`Username: ${body?.name}`);
	console.log(`Email: ${body?.email}`);
	console.log(`Form type: ${query?.typeForm}`);

	res.redirect(STATUS_CODE_303, '/newsletter/signup/thanks');
};

const newsLetterThanks = (req, res) => {
	res.render('newsletter-thanks');
};

module.exports = { newsLetterSignUp, newsLetterSignUpProcessInfo, newsLetterThanks };
