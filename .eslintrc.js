module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['react', 'import', 'prettier'],
  extends: [
    'plugin:react/recommended',
    'google',
    'prettier',
    'plugin:@next/next/recommended',
  ],
  ignorePatterns: ['out', '.next', 'node_modules'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      jsconfig: {
        config: 'jsconfig.json',
      },
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
    'prettier/prettier': 2,
    'no-console': 1,
    'react/jsx-boolean-value': 2,
    camelcase: 0,
  },
};
