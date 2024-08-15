module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/', '<rootDir>/functions/'],
  // setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
  },
  setupFiles: ['<rootDir>/tests/setup-tests.js'],
  testEnvironment: 'node',

  resolver: '<rootDir>/jest.resolver.js',
}
