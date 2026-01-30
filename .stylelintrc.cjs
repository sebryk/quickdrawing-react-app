/** @type {import('stylelint').Config} */
module.exports = {
   extends: ['stylelint-config-standard-scss'],
   ignoreFiles: ['dist/**/*', 'node_modules/**/*'],
   rules: {
      'declaration-block-no-duplicate-properties': true,
      'rule-empty-line-before': ['always-multi-line', { except: ['first-nested'] }],
   },
}
