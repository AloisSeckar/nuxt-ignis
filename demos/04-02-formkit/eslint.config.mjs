import withNuxt from './.nuxt/eslint.config.mjs'
import { ignisEslintRules } from '../../eslint.rules.mjs'

export default withNuxt(
  ignisEslintRules,
)
