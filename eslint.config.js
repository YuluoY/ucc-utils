const globals = require('globals')
const pluginJs = require('@eslint/js')
const eslintConfigPrettier = require('eslint-config-prettier')
const tseslint = require('typescript-eslint')

module.exports = [
  { files: ['src/**/*.{ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-shadow-restricted-names': 'off'
    }
  },
  {
    ignores: ['node_modules/*', '.git/*', 'dist/*', 'tests/*', '**/*.d.ts', '**/*.js']
  }
]
