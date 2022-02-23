module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb/hooks',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        allowString: false,
        allowNumber: false
      }
    ],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
    ],
  },
  ignorePatterns: ['src/**/*.test.ts', 'src/frontend/generated/*']
};
