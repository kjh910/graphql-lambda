module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'semi': [2, 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'camelcase': 'off',
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [2, 'single', { 'avoidEscape': true }]
  },
  settings: {
    react: {
      version: '17.0.2',
    },
  },
};