module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-empty-function': 'off',
    "no-var": "error",
    "semi": "error",
    "indent": "error",
    "no-multi-spaces": "error",
    "space-in-parens": "error",
    "no-multiple-empty-lines": "error",
    "prefer-const": "error",
    "no-use-before-define": "error"
  }
}
