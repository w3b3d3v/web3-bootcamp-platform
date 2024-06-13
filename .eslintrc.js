module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    semi: ['warn', 'never'],
  },
}