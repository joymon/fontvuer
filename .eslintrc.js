module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  rules: {
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
