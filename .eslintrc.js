module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['react', 'import'],
  extends: ['plugin:react/recommended', 'google', 'prettier'],
  ignorePatterns: ['out', '.next', 'node_modules'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 0,
    'react/prop-types': 0,
    'import/no-unresolved': 2,
    'no-undef': 2,
    camelcase: 0,
  },
};
