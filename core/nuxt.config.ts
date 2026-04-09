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
      const outDir = dirname('./public/')
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true })
      }
      // resolved ignis configuration for quick reference
      writeFileSync('./public/_ignis-config.json', JSON.stringify(nuxt.options.ignis, null, 2))
      // full Nuxt config object for possible debugging
      writeFileSync('./public/_nuxt-config.json', JSON.stringify(nuxt.options, null, 2))

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
