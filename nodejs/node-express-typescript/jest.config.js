// const {defaults} = require('jest-config');
module.exports = {
  // testMatch: defaults.testMatch,
  collectCoverage: true,
  coverageDirectory: "build/reports/coverage",
  coveragePathIgnorePatterns: ["/node_modules/"],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        suiteName: "{filename}",
        outputDirectory: "build/reports/junit/jest",
        outputName: "./results.xml",
        classNameTemplate: "{classname}",
        titleTemplate: "{title}",
        ancestorSeparator: " › ",
        usePathForSuiteName: "true",
      },
    ],
  ],
  projects: [
    {
      displayName: "unit",
      testMatch: ["<rootDir>/test/**/*.test.[jt]s", "<rootDir>/test/*.test.[jt]s"],
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
      },
    },
  ],
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  },
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};
