/* eslint-disable no-console */
const nodemailer = require('nodemailer');
const { faker } = require('@faker-js/faker');
const { credentials } = require('./config/config');

const INVALID_CREDENTIALS_SENDGRID = 'No credentials provided for SendGrid';
const INVALID_USER_SENDGRID = 'No user provided for SendGrid';
const INVALID_PASSWORD_SENDGRID = 'No password provided for SendGrid';
const DEFAULT_EMAIL_HOST = 'smtp.sendgrid.net';

const getSendGridCredentials = () => {
	const { sendGrid } = credentials || {};

	if (!credentials?.sendGrid) {
		throw new Error(INVALID_CREDENTIALS_SENDGRID);
	}

	const { user, pass } = sendGrid;

	if (!user) {
		throw new Error(INVALID_USER_SENDGRID);
	}

	if (!pass) {
		throw new Error(INVALID_PASSWORD_SENDGRID);
	}

	return {
		user,
		pass,
	};
};

const mailBodyMessage = () => ({
	from: '<brunoskr23@gmail.com>',
	to: '<brunosm21a@gmail.com>',
	subject: 'This is a email send test',
	text: faker.lorem.word(),
});

const mailTransport = () => {
	const { user, pass } = getSendGridCredentials();

	return nodemailer.createTransport({
		host: credentials?.EMAIL_HOST ?? DEFAULT_EMAIL_HOST,
		auth: {
			user,
			pass,
		},
	});
};

async function sendEmailSmtp() {
	try {
		const emailResult = await mailTransport().sendMail(mailBodyMessage());
		console.log('Email successfuly sent: ');
		console.log(emailResult);
	} catch (err) {
		console.error(`Email not send. An error ocurred: ${err?.message}`);
	}
}

sendEmailSmtp();
