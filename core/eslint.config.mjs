import withNuxt from './.nuxt/eslint.config.mjs'
import { ignisEslintRules } from '../eslint.rules.mjs'

// re-export for backwards compatibility with anything importing from this file
export { ignisEslintRules }

// config is being passed as an array of separate objects
// as suggested here: https://github.com/nuxt/eslint/discussions/413

export default withNuxt([

  // `rules` section can follow, where you can change default eslint behaviour if needed
  // you can adjust or even turn off some rules if you cannot or don't want to satisfy them

  // here we import the re-usable rules object
  ignisEslintRules,

])
