const PROCESS_FORM_VIEW = 'display-form-data';
const ERROR_HANDLER_VIEW = 'error-handler';
const ERROR_FULL_NAME = 'Full name not provided';
const ERROR_EMAIL = 'Email not provided';
const HTML_TYPE = 'text/html';
const JSON_TYPE = 'application/json';

const parserUserDataFromBody = (body) => {
	const { fullName, email } = body || {};

	if (!fullName) throw new Error(ERROR_FULL_NAME);
	if (!email) throw new Error(ERROR_EMAIL);

	return {
		fullName,
		email,
	};
};

const processForm = (req, res) => {
	try {
		const { body } = req;

		const userData = parserUserDataFromBody(body);

		// eslint-disable-next-line no-console
		console.log(userData);

		res.format({
			[HTML_TYPE]: () => res.redirect(303, PROCESS_FORM_VIEW),
			[JSON_TYPE]: () => res.status(200).json({ userData }),
		});
	} catch (err) {
		const { message } = err || {};
		// eslint-disable-next-line no-console
		console.error(message);

		res.format({
			[HTML_TYPE]: () => res.redirect(303, ERROR_HANDLER_VIEW),
			[JSON_TYPE]: () => res.status(500).json({ message }),
		});
	}
};

module.exports = processForm;
