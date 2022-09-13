module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(ts|tsx)$': '@swc/jest',
  },
  testPathIgnorePatterns: ['(/__tests__/integration/.*|\\.(integration))(\\.test)?\\.(ts|tsx|js)$'],
  setupFiles: ['./jest.setup.js'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/handler.ts'],
  coveragePathIgnorePatterns: [
    '(/__tests__/integration/.*|\\.(integration))\\.(ts|tsx|js)$',
    '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  ],
};
