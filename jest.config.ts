import { type JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFiles: ['./jest.setup.js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/handler.ts'],
  coveragePathIgnorePatterns: [
    '(/__tests__/integration/.*|\\.(integration))\\.(ts|tsx|js)$',
    '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    'src/(.)*.d.ts',
  ],
};
export default jestConfig;
