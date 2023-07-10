const { faker } = require('@faker-js/faker');

const getMockProducts = () => [
	{
		id: faker.string.uuid(),
		productInfo: faker.commerce.product(),
		productName: faker.commerce.productName(),
		productMaterial: faker.commerce.productMaterial(),
		productAdjective: faker.commerce.productAdjective(),
		price: faker.commerce.price(),
	},
];

module.exports = getMockProducts;
