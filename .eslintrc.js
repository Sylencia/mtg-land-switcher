const OFF = 0,
  WARN = 1,
  ERROR = 2

module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['prettier', 'react', 'standard'],
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'standard',
  ],
  rules: {
    'comma-dangle': [ERROR, 'always-multiline'],
    'react/jsx-pascal-case': OFF,
    'react/forbid-prop-types': OFF,
    'space-before-function-paren': OFF,
    'react/jsx-filename-extension': OFF,
    'prettier/prettier': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
