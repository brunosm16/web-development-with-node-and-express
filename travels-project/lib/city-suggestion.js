const { faker } = require('@faker-js/faker');

exports.getRandomCity = () => faker.location.city();
