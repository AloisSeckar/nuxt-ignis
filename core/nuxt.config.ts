import { defu } from 'defu'
import { setFeatures } from './features'

const ignisFeatures = setFeatures()

// https://nuxt.com/docs/guide/directory-structure/nuxt-config
const nuxtConfig = defu(ignisFeatures, {

  extends: [
    // Test-pack base layer
    'nuxt-spec',
  ],

  // https://nuxt.com/docs/api/nuxt-config#compatibilitydate
  compatibilityDate: '2025-06-07',

  // simple eslint config - see eslint.config.mjs
  eslint: {
    config: {
      stylistic: true,
    },
  },

  security: {
    headers: {
      contentSecurityPolicy: {
        'script-src': ['\'self\'', 'https:', '\'strict-dynamic\'', '\'nonce-{{nonce}}\'', '\'wasm-unsafe-eval\''],
      },
      crossOriginEmbedderPolicy: 'require-corp',
      crossOriginOpenerPolicy: 'same-origin',
    },
  },

  // app configuration
  runtimeConfig: {
    // nitro-only secret env-like variables go here
    public: {
      // client-exposed env-like variables go here

      // features
      // NOTE: due to static-like nature of nuxt.config.ts file
      // actual values MUST BE provided via .env file (or production equivalent)
      ignis: {

        // logging
        log: {
          level: 'info',
        },

        // nuxt-related config
        ssr: true, // true/false
        pages: true, // true/false

        // presets
        preset: {
          ui: 'off', // nuxt-ui/tailwind/off
          db: 'off', // neon/supabase/off
          forms: 'off', // formkit/vueform/off
          validation: 'off', // valibot/zod/off
        },

        // core modules
        // (may be disabled by explicitly setting "false")
        core: {
          eslint: true,
          fonts: true,
          image: true,
          pinia: true,
          time: true,
          scripts: true,
          security: true,
          vueuse: true,
        },

        // optional modules
        ui: false, // true/false
        tailwind: false, // true/false (ignored, if ui=true)
        neon: false, // true/false
        supabase: false, // true/false
        i18n: {
          enabled: false, // true/false
          default: 'en', // default locale (should be same as formkit)
          config: './i18n.config.ts', // path to config file
        },
        formkit: {
          enabled: false, // true/false
          default: 'en', // default locale (should be same as i18n)
          config: './formkit.config.ts', // path to config file
        },
        vueform: false, // true/false
        valibot: false, // true/false
        zod: false, // true/false
        content: false, // true/false
        openprops: false, // true/false
        pslo: {
          enabled: false, // true/false (elrh-pslo will (not) be used)
          content: false, // true/false (elrh-pslo will (not) be aplied on nuxt-content)
        },
        seo: false, // true/false
        auth: false, // true/false

        // extra behavior
        warn: {
          duplicates: true, // true/false
        },
      },
    },
  },
})

// https://nuxt.com/docs/getting-started/configuration#nuxt-configuration
// @ts-expect-error unknown object type
// TODO elaborate correct type for "nuxtConfig" object
export default defineNuxtConfig(nuxtConfig)
