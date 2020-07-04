const defaultConfig = require('./jest.config');

module.exports = {
  ...defaultConfig,
  verbose: true,
  testMatch: ['<rootDir>**/?(*.)+(int).[jt]s?(x)'],
};
