const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/node_modules/@testing-library/jest-dom'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.(ts|tsx|js)'],
};

module.exports = createJestConfig(customJestConfig);