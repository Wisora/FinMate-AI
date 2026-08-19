/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      displayName: "frontend",
      preset: "ts-jest",
      testEnvironment: "jsdom",
      setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
      testMatch: ["**/__tests__/**/*.test.tsx", "**/?(*.)+(spec|test).tsx"],
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
      },
    },
    {
      displayName: "backend",
      preset: "ts-jest",
      testEnvironment: "node",
      testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
      },
      // 👇 allow transforming Prisma client and other ESM deps
      transformIgnorePatterns: ["node_modules/(?!(@prisma/client|prisma))"],
    },
  ],
};
