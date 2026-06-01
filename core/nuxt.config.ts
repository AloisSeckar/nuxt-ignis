import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { getIgnisFeaturesOverview } from './overview'

// https://nuxt.com/docs/4.x/directory-structure/nuxt-config
export default defineNuxtConfig({
  extends: [
    // Test-pack base layer
    'nuxt-spec',
  ],

  // https://nuxt.com/docs/4.x/api/nuxt-config#compatibilitydate
  compatibilityDate: '2026-06-01',

  // supressing misleading Windows warnings (#179)
  // based on https://github.com/nuxt/nuxt/issues/27424#issuecomment-4128539968
  // TODO verify the solution (why 'CIRCULAR_DEPENDENCY' warnings start appearing when 'UNRESOLVED_IMPORT' is silenced and if isn't this filter too broad for other use.cases?)
  nitro: {
    rollupConfig: {
      onwarn: (warning, warn) => {
        if (warning.code === 'UNRESOLVED_IMPORT' || warning.code === 'CIRCULAR_DEPENDENCY') {
          return
        } else {
          warn(warning)
        }
      },
    },
  },

  // Nuxt automated recommendation based on https://vite.dev/guide/dep-pre-bundling.html
  vite: {
    optimizeDeps: {
      include: [
        'sqlstring', // CJS
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'date-fns',
      ],
    },
  },

  hooks: {
    'ready'(nuxt) {
      // write current config to file (for use in app)
      const outDir = './public'
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
