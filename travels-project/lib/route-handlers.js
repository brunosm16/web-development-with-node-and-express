const { INTERNAL_SERVER_ERROR_VIEW } = require('../constants/views-names');
const { STATUS_CODE_500 } = require('../constants/http-status-codes');

const renderFallbackView = (res) => {
	res.status(STATUS_CODE_500);
	res.render(INTERNAL_SERVER_ERROR_VIEW);
};

const formatObjData = (dataObj) => {
	const isObject = typeof dataObj === 'object';
	return isObject ? dataObj : {};
};

const hasEmptyMandatoryFields = (view, status) => !status || !view;

const renderView = (req, res, view, status, dataObj = {}) => {
	if (hasEmptyMandatoryFields(view, status)) {
		renderFallbackView(res);
		return;
	}

	res.status(status);
	res.render(view, formatObjData(dataObj));
};

module.exports = renderView;
