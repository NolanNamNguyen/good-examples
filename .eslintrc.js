const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['next', 'prettier', 'next/core-web-vitals'],
  plugins: ['prettier', 'redux-saga'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'import/no-unresolved': 2,
    'no-console': 1,
    'no-unused-vars': 2,
    'prefer-template': 2,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'no-undef': 2,
  },
};
