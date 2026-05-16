// re-usable custom ESLint rules

/** @type {import('eslint').Linter.Config} */
export const ignisEslintRules = {
  rules: {
    // the default for this rule is "1", but I find it too restrictive
    // https://eslint.vuejs.org/rules/max-attributes-per-line
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 4,
      },
      multiline: {
        max: 3,
      },
    }],
    // do not place new line before HTML TAG closing bracket
    // https://eslint.vuejs.org/rules/html-closing-bracket-newline
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'never',
        selfClosingTag: {
          multiline: 'never',
        },
      },
    ],
    // the default rule forces newline after "else"
    // I prefer using "} else {" on single row
    // https://eslint.style/rules/brace-style
    '@stylistic/brace-style': ['error', '1tbs'],
  },
}
