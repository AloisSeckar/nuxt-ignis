import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import { getIgnisFeaturesOverview } from './overview'

// https://nuxt.com/docs/4.x/directory-structure/nuxt-config
export default defineNuxtConfig({
  extends: [
    // Test-pack base layer
    'nuxt-spec',
  ],

  // https://nuxt.com/docs/4.x/api/nuxt-config#compatibilitydate
  compatibilityDate: '2026-02-01',

  hooks: {
    'ready'(nuxt) {
      // write current config to file (for use in app)
      const configObject = JSON.stringify(nuxt.options, null, 2)

      const outPath = './public/_ignis-config.json'
      const outDir = dirname(outPath)
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true })
      }

      writeFileSync(outPath, configObject)

      // evaluate and display settings overview in console
      // (when placed into this hook, it will only run once)
      getIgnisFeaturesOverview(nuxt.options.ignis)
    },
  },

  // simple eslint config - see eslint.config.mjs
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
