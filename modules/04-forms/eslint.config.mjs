import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import { ignisEslintRules } from '../../eslint.rules.mjs'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    // Rules for module authors
    tooling: true,
    // Rules for formatting
    stylistic: true,
  },
  dirs: {
    src: [
      './playground',
    ],
  },
})
  .append(
    ignisEslintRules,
  )
