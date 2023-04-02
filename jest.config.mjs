// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  // collectCoverageFrom: ["src/**/*.{tsx}", "!src/**/*.spec.tsx"],
  collectCoverageFrom: ["src/**/*.tsx"],
  coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
