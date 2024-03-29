module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'next',
    'plugin:react/recommended',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'require-explicit-generics'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
  ignorePatterns: ['**/*.js', '**/*.jsx', 'tsconfig.json'],
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^[~]', '\\.module.scss$']
      }
    ],
    '@next/next/no-img-element': 'off',
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'react/jsx-no-bind': 'off',
    'react/jsx-pascal-case': ['error'],
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'off',
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'off',
    'require-explicit-generics/require-explicit-generics': [
      'error',
      // List your functions here
      ['useState']
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-console': 'off',
    'no-unused-vars': [2, { args: 'none' }],
    'no-else-return': ['error', { allowElseIf: false }],
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    radix: ['error', 'as-needed'],
    'padding-line-between-statements': 'off',
    '@typescript-eslint/padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['interface', 'class', 'function', 'export']
      }
    ],
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: false,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        allowedNames: []
      }
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: true,
        variableDeclarationIgnoreFunction: true
      }
    ],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: { arrow: { before: true, after: true } }
      }
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true
        }
      }
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error']
  }
}
