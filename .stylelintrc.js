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
    'rule-empty-line-before': 'never',
    'declaration-empty-line-before': 'never',
    'at-rule-no-unknown': [
      true,
      {
        // tailwind CSS のためのルール
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen']
      }
    ],
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { ignoreShorthands: ['/flex/'] }
    ]
  },
  ignoreFiles: ['**/node_modules/**', '**/build/**']
};
