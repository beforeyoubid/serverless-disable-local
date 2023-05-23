import { type Config } from 'jest';

const jestConfig: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  roots: ['<rootDir>/src'],
  setupFiles: ['./jest.setup.js'],
  testRegex: ['(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/handler.ts'],
  coveragePathIgnorePatterns: [
    '(/__tests__/integration/.*|\\.(integration))\\.(ts|tsx|js)$',
    '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    'src/(.)*.d.ts',
  ],
};
export default jestConfig;
