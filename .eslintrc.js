module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  globals: {},
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
  rules: {
    'no-extra-semi': 'off',
    'no-unused-vars': 'off',
    'no-redeclare': 'off',

    'no-loss-of-precision': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    'camelcase': ['error', { properties: 'always' }],

    'sort-imports': 'off',
    'simple-import-sort/imports': ['error', { groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']] }],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/consistent-type-assertions': 'off',

    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/method-signature-style': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/dot-notation': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/triple-slash-reference': ['error', { path: 'never', types: 'never', lib: 'never' }],
    '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: 'no-public' } }],
    '@typescript-eslint/explicit-module-boundary-types': ['error', { allowArgumentsExplicitlyTypedAsAny: true }],
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],

    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: false,
        types: {
          Function: 'Avoid using the `Function` type. Use a specific function type, like `() => void`.',
          Object: { message: 'Avoid using the `Object` type. Did you mean `object`?', fixWith: 'object' },
          Boolean: { message: 'Avoid using the `Boolean` type. Did you mean `boolean`?', fixWith: 'boolean' },
          Number: { message: 'Avoid using the `Number` type. Did you mean `number`?', fixWith: 'number' },
          String: { message: 'Avoid using the `String` type. Did you mean `string`?', fixWith: 'string' },
          Symbol: { message: 'Avoid using the `Symbol` type. Did you mean `symbol`?', fixWith: 'symbol' },
        },
      },
    ],

    '@typescript-eslint/consistent-type-assertions': [
      'error',
      { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' },
    ],

    '@typescript-eslint/member-ordering': [
      'error',
      { default: ['static-field', 'static-method', 'decorated-field', 'decorated-method', 'constructor'] },
    ],

    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase'],
        leadingUnderscore: 'allowSingleOrDouble',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
        modifiers: ['unused'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['UPPER_CASE', 'camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['variableLike', 'memberLike'],
        format: ['camelCase'],
        modifiers: ['private'],
        prefix: ['__', '_'],
      },
      {
        selector: ['variableLike', 'memberLike'],
        format: ['camelCase'],
        modifiers: ['unused'],
        leadingUnderscore: 'require',
      },
      {
        selector: ['enum', 'enumMember'],
        format: ['PascalCase'],
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.spec.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
    },
  ],
}
