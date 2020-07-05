module.exports = {
  projects: [
    {
      displayName: "main",
      runner: "jest-runner-eslint",
      testMatch: ["<rootDir>/src/**/*.(j|t)s", "<rootDir>/src/*.(j|t)s"],
    },
    {
      displayName: "test",
      runner: "jest-runner-eslint",
      testMatch: ["<rootDir>/test/**/*.(j|t)s", "<rootDir>/test/*.(j|t)s"],
    },
  ],
  watchPlugins: ["jest-runner-eslint/watch-fix"],
};
