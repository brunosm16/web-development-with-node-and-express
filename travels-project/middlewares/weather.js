const { faker } = require('@faker-js/faker');

const FIX_WEATHER_MOCK_LENGTH = 5;

const getWeatherData = async () => {
	const weather = [];

	const mockWeather = () => ({
		location: {
			name: faker.lorem.word(),
			coordinates: { lat: faker.number.int(), lng: faker.number.int() },
		},
		forecastUrl: faker.internet.url(),
		iconUrl: faker.internet.url(),
		weather: faker.lorem.word(),
		temp: faker.number.int({ max: 100 }),
	});

	for (let i = 0; i < FIX_WEATHER_MOCK_LENGTH; i += 1) {
		weather.push(mockWeather());
	}

	return Promise.resolve(weather);
};

const weatherMiddleware = async (req, res, next) => {
	if (!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherContext = await getWeatherData();
	next();
};

module.exports = weatherMiddleware;
