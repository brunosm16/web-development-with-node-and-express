const { faker } = require('@faker-js/faker');

const getMockProducts = () => ({
	product: faker.commerce.product(),
	productName: faker.commerce.productName(),
	productMaterial: faker.commerce.productMaterial(),
	productAdjective: faker.commerce.productAdjective(),
});

module.exports = getMockProducts;
