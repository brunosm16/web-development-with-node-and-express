/* eslint-disable no-console */
const { faker } = require('@faker-js/faker');
const { credentials } = require('./config/config');

const emailService = require('./lib/email-service')(credentials);

const mailOptions = {
	from: credentials?.emailSender,
	to: credentials?.emailReceiver,
	subject: 'This is a test for sending emails',
	html: `<h2>${faker.lorem.word()}</h2>`,
};

async function sendEmailSmtp() {
	try {
		const { from, to, subject, html } = mailOptions;
		const emailResult = await emailService.send(from, to, subject, html);
		console.log('Email successfuly sent: \n\n');
		console.log(emailResult);
	} catch (err) {
		console.error(`Email not send. An error ocurred: ${err?.message}`);
	}
}

sendEmailSmtp();
