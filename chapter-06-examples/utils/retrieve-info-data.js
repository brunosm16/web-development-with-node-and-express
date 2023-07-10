const { faker } = require('@faker-js/faker');

const retrieveInfoData = () => ({
	firstName: faker.person.firstName(),
	lastName: faker.person.lastName(),
	jobArea: faker.person.jobArea(),
	jobType: faker.person.jobType(),
	jobTitle: faker.person.jobTitle(),
});

module.exports = retrieveInfoData;
