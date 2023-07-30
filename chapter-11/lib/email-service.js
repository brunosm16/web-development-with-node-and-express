const nodemailer = require('nodemailer');

const INVALID_CREDENTIALS_SENDGRID = 'No credentials provided for SendGrid';
const INVALID_USER_SENDGRID = 'No user provided for SendGrid';
const INVALID_PASSWORD_SENDGRID = 'No password provided for SendGrid';
const DEFAULT_EMAIL_HOST = 'smtp.sendgrid.net';

module.exports = (credentials) => {
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

	const validateMailOptions = (options) => {
		Object.keys(options).forEach((key) => {
			if (!options[key]) {
				throw new Error(`Field ${key} is required for sending the email`);
			}
		});
	};

	return {
		send: (from, to, subject, html) => {
			const mailOptions = {
				from,
				to,
				subject,
				html,
			};
			validateMailOptions(mailOptions);
			return mailTransport().sendMail(mailOptions);
		},
	};
};
