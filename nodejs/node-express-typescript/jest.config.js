// const {defaults} = require('jest-config');
module.exports = {
  // testMatch: defaults.testMatch,
  collectCoverage: true,
  coverageDirectory: 'build/reports/coverage',
  coveragePathIgnorePatterns: ['/node_modules/', 'src/data/*'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        suiteName: '{filename}',
        outputDirectory: 'build/reports/junit/jest',
        outputName: './results.xml',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
        ancestorSeparator: ' › ',
        usePathForSuiteName: 'true',
      },
    ],
  ],
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/test/**/*.test.[jt]s', '<rootDir>/test/*.test.[jt]s'],
    },
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ["./jest-runner-eslint.config.js"]
};
