const defaultConfig = require('./jest.config');

module.exports = {
  ...defaultConfig,
  collectCoverage: false,
  projects: [
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/test/**/?(*.)+(int).[jt]s?(x)', '<rootDir>/test/?(*.)+(int).[jt]s?(x)'],
    },
  ],
};
