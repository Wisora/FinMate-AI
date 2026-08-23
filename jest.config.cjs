module.exports = {
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  testEnvironment: "jsdom",

  // Explicitly tell Jest where your tests live
  roots: ["<rootDir>/tests"],

  // Match all test files inside that folder
  testMatch: ["**/*.test.(ts|tsx|js)"],

  // Force resolution of testing-library/react
  moduleNameMapper: {
    "^@testing-library/react$": "<rootDir>/node_modules/@testing-library/react"
  }
};