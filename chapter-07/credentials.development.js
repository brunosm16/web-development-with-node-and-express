require('dotenv/config');

module.exports = {
	cookieSecret: process.env.COOKIE_SECRET_DEV,
	sendGrid: {
		user: process.env.SENDGRID_USER_DEV,
		pass: process.env.SENDGRID_PASSWORD_DEV,
	},
};
