module.exports = {
   root: true,
   parser: '@typescript-eslint/parser',
   parserOptions: {
      tsconfigRootDir: __dirname,
      project: ['./tsconfig.json'],
      sourceType: 'module',
   },
   plugins: ['@typescript-eslint'],
   extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
   ],
   ignorePatterns: ['dist/', 'node_modules/'],
   rules: {
      '@typescript-eslint/no-unused-vars': [
         'error',
         { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
   },
}
