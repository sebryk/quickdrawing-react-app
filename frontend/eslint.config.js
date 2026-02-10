import globals from 'globals';
import js from '@eslint/js';
import eslintReact from 'eslint-plugin-react';
import eslintJsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
   {
      plugins: {
         react: eslintReact,
         'jsx-a11y': eslintJsxA11y,
         prettier: prettierPlugin,
         perfectionist,
         'unused-imports': unusedImports,
      },
   },
   {
      ignores: [
         'build/**',
         '.next/**',
         '.husky/',
         'public/**',
         '.cache/',
         'node_modules/',
         'package-lock.json',
         'yarn.lock',
         'gatsby-**.js',
         'out/**',
      ],
   },
   js.configs.recommended,
   eslintReact.configs.flat.recommended,
   {
      languageOptions: {
         globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.es2021,
         },
         parserOptions: {
            ...eslintJsxA11y.flatConfigs.recommended.parserOptions,
            ...eslintReact.configs.flat.recommended.parserOptions,
         },
         ...eslintJsxA11y.flatConfigs.recommended.languageOptions,
         ...eslintReact.configs.flat.recommended.languageOptions,
      },
   },
   {
      settings: {
         react: {
            version: 'detect',
         },
         linkComponents: [{ name: 'Link', linkAttribute: ['to', 'href'] }],
      },
   },
   {
      files: ['**/*.{js,jsx}'],
      rules: {
         ...eslintConfigPrettier.rules,
         'no-unused-vars': 'off',
         'no-explicit-any': 'off',
         'unused-imports/no-unused-imports': 'error',
         'react/function-component-definition': 'off',
         'no-undef': 'off',
         'no-useless-escape': 'off',
         'no-unsafe-optional-chaining': 'warn',
         'no-control-regex': 'off',
         'no-debugger': 'error',
         'no-dupe-else-if': 'error',
         'no-dupe-keys': 'error',
         'no-duplicate-imports': 'error',
         'no-template-curly-in-string': 'error',
         'default-case': 'error',
         'default-case-last': 'error',
         eqeqeq: ['error', 'always'],
         'func-style': ['error', 'expression', { allowArrowFunctions: true }],
         'init-declarations': ['error', 'always'],
         'no-alert': 'error',
         'no-console':
            process.env.NODE_ENV === 'production' ? ['error', { allow: ['error'] }] : ['warn', { allow: ['error'] }],
         'no-else-return': 'error',
         'no-lonely-if': 'error',
         'no-useless-return': 'error',
         'prefer-destructuring': [
            'error',
            {
               array: false,
               object: true,
            },
         ],
         yoda: 'error',
         'no-inline-comments': 'error',
         'no-empty-function': 'warn',
         'no-unneeded-ternary': 'warn',
         'prefer-const': 'error',
         'arrow-body-style': 'off',
         'prefer-template': 'warn',
         'require-await': 'error',
         'no-const-assign': 'warn',
         'react/display-name': 'warn',
         'react/prop-types': 'off',
         'react/jsx-boolean-value': [2, 'always'],
         'react/jsx-uses-react': 'off',
         'react/react-in-jsx-scope': 'off',
         'jsx-a11y/no-autofocus': [
            2,
            {
               ignoreNonDOM: false,
            },
         ],
         'jsx-a11y/alt-text': [
            2,
            {
               elements: ['img', 'object', 'area', 'input[type="image"]'],
               img: ['Image', 'LazyLoadImage', 'ExportedImage'],
               object: ['Object'],
               area: ['Area'],
               'input[type="image"]': ['InputImage'],
            },
         ],
         'jsx-a11y/anchor-has-content': `warn`,
         'jsx-a11y/anchor-is-valid': `warn`,
         'jsx-a11y/aria-activedescendant-has-tabindex': `warn`,
         'jsx-a11y/aria-props': `warn`,
         'jsx-a11y/aria-proptypes': `warn`,
         'jsx-a11y/aria-role': `warn`,
         'jsx-a11y/aria-unsupported-elements': `warn`,
         'perfectionist/sort-array-includes': 'warn',
         'perfectionist/sort-jsx-props': [
            'warn',
            {
               type: 'line-length',
               order: 'asc',
            },
         ],
         'perfectionist/sort-named-exports': [
            'warn',
            {
               type: 'line-length',
            },
         ],
         'perfectionist/sort-sets': 'warn',
         'perfectionist/sort-variable-declarations': [
            'warn',
            {
               type: 'line-length',
               order: 'asc',
            },
         ],
         'perfectionist/sort-imports': [
            'warn',
            {
               type: 'alphabetical',
               ignoreCase: true,
               specialCharacters: 'keep',
               internalPattern: ['^@/'],
               newlinesBetween: 'always',
               maxLineLength: undefined,
               groups: [
                  'type',
                  'react',
                  'external',
                  'mui',
                  'internal',
                  'relative',

                  'style',
                  'asset',
                  'object',
                  'unknown',
               ],
               customGroups: {
                  value: {
                     react: ['^react(-dom)?(/|$)'],
                     style: ['^.+\\.(css|scss)$'],
                     asset: ['^.+\\.(jpg|jpeg|png|svg|webp|gif)$'],
                     relative: [
                        '^\\./(?!.*\\.(css|scss|sass|jpg|jpeg|png|svg|webp|gif)$).*',
                        '^\\.\\./(?!.*\\.(css|scss|sass|jpg|jpeg|png|svg|webp|gif)$).*',
                     ],
                  },
               },
               environment: 'node',
            },
         ],
      },
   },
];
