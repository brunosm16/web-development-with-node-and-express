const { INTERNAL_SERVER_ERROR_VIEW } = require('../constants/views-names');
const { STATUS_CODE_200, STATUS_CODE_500 } = require('../constants/http-status-codes');

const renderFallbackView = (res) => {
	res.status(STATUS_CODE_500);
	res.render(INTERNAL_SERVER_ERROR_VIEW);
};

const formatData = (dataObj) => {
	const isObject = typeof dataObj === 'object';
	const nonEmptyObject = isObject && !!Object.keys(dataObj)?.length;
	if (nonEmptyObject) return dataObj;
	return {};
};

const hasEmptyMandatoryFields = (view, status) => !status || !view;

const renderView = (req, res, view, status = STATUS_CODE_200, dataObj = {}) => {
	if (hasEmptyMandatoryFields(view, status)) {
		renderFallbackView(res);
		return;
	}

	if (status) res.status(status);
	res.render(view, formatData(dataObj));
};

module.exports = renderView;
