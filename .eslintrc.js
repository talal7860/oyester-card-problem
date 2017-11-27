module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "lodash-fp",
  ],
  "extends": [
    "airbnb",
    "plugin:lodash-fp/recommended",
  ],
  "rules": {
    "arrow-parens": 0, // allow async functions
  },
  "env": {
    "mocha": true
  },
};

