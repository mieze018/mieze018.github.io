module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-prettier/recommended',
    'stylelint-config-prettier'
  ],
  rules: {
    'comment-empty-line-before': 'never',
    'rule-empty-line-before': 'never'
  },
  ignoreShorthands: ['/flex/'],
  ignoreFiles: ['**/node_modules/**']
};
