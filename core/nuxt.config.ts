import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'
import { defu } from 'defu'
import { log } from './app/utils/consola'
import { setFeatures } from './features'
import type { NuxtConfig } from '@nuxt/schema'

const currentFeatures = setFeatures()

// https://nuxt.com/docs/guide/directory-structure/nuxt-config
const baseConfig: NuxtConfig = {

  extends: [
    // Test-pack base layer
    'nuxt-spec',
  ],

  // https://nuxt.com/docs/4.x/api/nuxt-config#compatibilitydate
  compatibilityDate: '2026-02-01',

  // simple eslint config - see eslint.config.mjs
  eslint: {
    config: {
      stylistic: true,
    },
  },

  hooks: {
    'schema:resolved'() {
      // write current config to file (for use in app)
      const configObject = JSON.stringify(currentFeatures.nuxtConfig, null, 2)

      const outPath = './public/_ignis-config.json'
      const outDir = dirname(outPath)
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true })
      }

      writeFileSync(outPath, configObject)

      // display settings overview in console (just once)
      log.info('\nNuxt Ignis will start using following settings:\n' + currentFeatures.overview)
    },
  },
}

// to avoid type inference issues
const effectiveConfig = defu(currentFeatures.nuxtConfig, baseConfig) as NuxtConfig

// https://nuxt.com/docs/getting-started/configuration#nuxt-configuration
// using spread operator to avoid Proxy issues
export default defineNuxtConfig({ ...effectiveConfig })
