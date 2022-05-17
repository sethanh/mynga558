module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "airbnb/hooks",
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    '@typescript-eslint',
  ],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.tsx', '.ts'],
      },
    ],
    'arrow-body-style': 0,
    'linebreak-style': 0,
    'global-require': 0,
    'eslint linebreak-style': [0, 'error', 'windows'],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-cycle': 0,
    'react/forbid-prop-types': 0,
    'no-param-reassign': 0,
    'no-useless-escape': 0,
    'import/prefer-default-export': 0,
    'no-unused-expressions': 0,
    'react/jsx-props-no-spreading': 0,
    'no-shadow': 'off',
    semi: ['error', 'never'],
    '@typescript-eslint/semi': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      args: 'none',
    }],
    'no-console': 'off',
    "no-nested-ternary": 'off',
    "react/no-array-index-key": 'off',
    "react/destructuring-assignment": [0, 'never']
  },
}
