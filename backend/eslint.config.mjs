import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
   {
      ignores: ['dist/**', 'node_modules/**'],
   },
   js.configs.recommended,
   {
      files: ['src/**/*.ts'],
      languageOptions: {
         parser: tsParser,
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            project: './tsconfig.json',
         },
         globals: {
            Buffer: 'readonly',
            fetch: 'readonly',
            process: 'readonly',
         },
      },
      plugins: {
         '@typescript-eslint': tseslint,
      },
      rules: {
         ...tseslint.configs.recommended.rules,
         '@typescript-eslint/no-unused-vars': [
            'error',
            {
               args: 'after-used',
               argsIgnorePattern: '^_',
               varsIgnorePattern: '^_',
               ignoreRestSiblings: true,
            },
         ],
      },
   },
];
