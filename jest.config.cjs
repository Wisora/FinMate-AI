module.exports = {
  // Transpile JS/TS files using Babel
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },

  // Setup DOM environment and extended matchers
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  // Supported extensions
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

  // Tell Jest where tests live
  roots: ["<rootDir>/tests"],

  // Match test files
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
  ],

  // Module path aliases (adjust if using paths like '@/' in tsconfig)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};