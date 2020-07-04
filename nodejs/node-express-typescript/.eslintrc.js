module.exports = {
  "extends": [
    "eslint:recommended",
    "airbnb-base",
    "prettier"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "plugins": [
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
    }
  },
  "rules": {
    "max-len": ["error", {"code": 120}],
    "prettier/prettier": "error",
    "no-restricted-syntax": "off"
  },
  overrides: [
    Object.assign(
        {
          files: [ '**/*.test.js' ],
          env: { jest: true },
          plugins: [ 'jest' ],
        },
        require('eslint-plugin-jest').configs.recommended
    )
  ]
}
