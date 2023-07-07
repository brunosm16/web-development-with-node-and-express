const { faker } = require('@faker-js/faker');
const {
	STATUS_CODE_200,
	STATUS_CODE_400,
	STATUS_CODE_500,
} = require('../../constants/http-status-codes');
const {
	HOMEPAGE_VIEW,
	ABOUT_VIEW,
	INTERNAL_SERVER_ERROR_VIEW,
} = require('../../constants/views-names');
const renderView = require('../route-handlers');

describe('Testing route handlers', () => {
	const expressMock = {
		req: {},
		res: {
			render: jest.fn(),
			status: jest.fn(),
		},
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render HomePage view', () => {
		const { req, res } = expressMock;

		renderView(req, res, HOMEPAGE_VIEW, STATUS_CODE_200);

		expect(res.render).toHaveBeenCalledWith(HOMEPAGE_VIEW, {});
		expect(res.status).toHaveBeenCalledWith(STATUS_CODE_200);
	});

	it('should render About view', () => {
		const { req, res } = expressMock;

		renderView(req, res, ABOUT_VIEW, STATUS_CODE_200);

		expect(res.render).toHaveBeenCalledWith(ABOUT_VIEW, {});
		expect(res.status).toHaveBeenCalledWith(STATUS_CODE_200);
	});

	it('should render NotFound view', () => {
		const { req, res } = expressMock;

		renderView(req, res, ABOUT_VIEW, STATUS_CODE_400);

		expect(res.render).toHaveBeenCalledWith(ABOUT_VIEW, {});
		expect(res.status).toHaveBeenCalledWith(STATUS_CODE_400);
	});

	it('should render InternalError view', () => {
		const { req, res } = expressMock;

		renderView(req, res, INTERNAL_SERVER_ERROR_VIEW, STATUS_CODE_500);

		expect(res.render).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR_VIEW, {});
		expect(res.status).toHaveBeenCalledWith(STATUS_CODE_500);
	});

	it('should render dataObj correctly', () => {
		const { req, res } = expressMock;

		const dataObj = { mockDataObj: faker.lorem.words() };

		renderView(req, res, HOMEPAGE_VIEW, STATUS_CODE_200, dataObj);

		expect(res.render).toHaveBeenCalledWith(HOMEPAGE_VIEW, dataObj);
	});

	it('should not render data if is not a object', () => {
		const { req, res } = expressMock;

		const dataObj = faker.lorem.words();

		renderView(req, res, HOMEPAGE_VIEW, dataObj);

		expect(res.render).not.toHaveBeenCalledWith(HOMEPAGE_VIEW, dataObj);
	});

	it('should not render null dataObj', () => {
		const { req, res } = expressMock;

		const dataObj = null;

		renderView(req, res, HOMEPAGE_VIEW, dataObj);

		expect(res.render).not.toHaveBeenCalledWith(HOMEPAGE_VIEW, dataObj);
	});

	it('should render InternalError view if status not provided', () => {
		const { req, res } = expressMock;

		const dataObj = { mockDataObj: faker.lorem.words() };

		renderView(req, res, HOMEPAGE_VIEW, null, dataObj);

		expect(res.render).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR_VIEW);
	});

	it('should render InternalError view if no view provided', () => {
		const { req, res } = expressMock;

		const dataObj = { mockDataObj: faker.lorem.words() };

		renderView(req, res, null, STATUS_CODE_200, dataObj);

		expect(res.render).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR_VIEW);
	});
});
