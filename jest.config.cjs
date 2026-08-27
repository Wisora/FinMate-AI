module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },

  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  roots: ['<rootDir>/tests'],

  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Ignore CSS/Style imports during tests
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Mock image/asset imports
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
};