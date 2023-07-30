const FALLBACK_ENVIRONMENT = 'development';
const environment = process.env.NODE_ENV ?? FALLBACK_ENVIRONMENT;

// eslint-disable-next-line import/no-dynamic-require
const credentials = require(`../credentials.${environment}`);

module.exports = { credentials };
