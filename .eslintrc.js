module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': 'warn',
    eqeqeq: ['error', 'always'],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
