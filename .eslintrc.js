module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 0,
    camelCase: 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/defined-types-are-used': 0,
    'prefer-const': 0,
  },
};
