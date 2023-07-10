const JSON_TYPE = 'application/json';
const XML_TYPE = 'application/xml';
const TEXT_XML = 'text/xml';
const TEXT_PLAIN = 'text/plain';

const getMockProducts = require('../mocks/get-mock-products');

const getXMLValueByKey = (key, value) => `${key}="${value}"`;

const formatProductToPlainText = (product) => {
	const { productInfo, productName, productMaterial, productAdjective, price } = product;
	return `${productInfo}:${productName}:${productMaterial}:${productAdjective}:${price}`;
};

const buildProductXMLProperty = (product) => {
	const { productInfo, productName, productMaterial, productAdjective, price } = product;

	const info = getXMLValueByKey('info', productInfo);
	const name = getXMLValueByKey('name', productName);
	const material = getXMLValueByKey('material', productMaterial);
	const adjective = getXMLValueByKey('adjective', productAdjective);
	const productPrice = getXMLValueByKey('price', price);

	return `<product ${info} ${name} ${material} ${adjective} ${productPrice}></product>`;
};

const formatProductsToXML = (products) => {
	const mappedProductsToXML = products.map((product) => buildProductXMLProperty(product));
	const xmlResult = `<?xml version="1.0"><products>${mappedProductsToXML}</products>`;
	return xmlResult;
};

const formatProductsToPlainText = (products) =>
	products.map((product) => formatProductToPlainText(product));

const processProducts = (req, res) => {
	const products = getMockProducts();
	const productsXML = formatProductsToXML(products);
	const productsPlainText = formatProductsToPlainText(products);

	res.format({
		[JSON_TYPE]: () => res.json(products),
		[XML_TYPE]: () => res.type(XML_TYPE).send(productsXML),
		[TEXT_XML]: () => res.type(TEXT_XML).send(productsXML),
		[TEXT_PLAIN]: () => res.type(TEXT_PLAIN).send(productsPlainText),
	});
};

module.exports = processProducts;
