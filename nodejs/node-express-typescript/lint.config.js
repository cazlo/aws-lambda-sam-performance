module.exports = {
  projects: [
    {
      displayName: 'lambda',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/index.js'],
    },
    {
      displayName: 'main',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/src/**/*.js', '<rootDir>/src/*.js'],
    },
    {
      displayName: 'test',
      runner: 'jest-runner-eslint',
      testMatch: ['<rootDir>/test/**/*.js', '<rootDir>/test/*.js'],
    },
  ],
  watchPlugins: ['jest-runner-eslint/watch-fix'],
};
