import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { getIgnisFeaturesOverview } from './overview'

// https://nuxt.com/docs/4.x/directory-structure/nuxt-config
export default defineNuxtConfig({
  extends: [
    // Test-pack base layer
    'nuxt-spec',
  ],

  // https://nuxt.com/docs/4.x/api/nuxt-config#compatibilitydate
  compatibilityDate: '2026-08-15',

  // supressing known misleading warnings (#179)
  // based on https://github.com/nuxt/nuxt/issues/27424#issuecomment-4128539968
  // TODO should be fixed in Nuxt v5 as per https://github.com/nuxt/nuxt/issues/27424#issuecomment-5093401041
  nitro: {
    rollupConfig: {
      onwarn: (warning, warn) => {
        // circular dependency in nitro (and semver) resolution
        if (warning.code === 'CIRCULAR_DEPENDENCY' && (warning.message.includes('virtual:#imports') || warning.message.includes('node_modules/nitropack') || warning.message.includes('semver'))) {
          return
        }

        // unused import in chokidar package
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && warning.message.includes('"Stats"') && warning.message.includes('chokidar')) {
          return
        }

        // otherwise proceed normally
        warn(warning)
      },
    },
  },

  // Nuxt automated recommendation based on https://vite.dev/guide/dep-pre-bundling.html
  vite: {
    optimizeDeps: {
      include: [
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
