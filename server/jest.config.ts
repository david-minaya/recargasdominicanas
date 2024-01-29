export default {
  preset: 'ts-jest',
  globalSetup: '<rootDir>/src/tests/globalSetup.js',
  globalTeardown: '<rootDir>/src/tests/globalTeardown.js',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/dist'
  ]
};
