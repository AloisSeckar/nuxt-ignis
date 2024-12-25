import { defu } from 'defu'
import { setFeatures } from './features'

const ignisFeatures = setFeatures()

// https://nuxt.com/docs/guide/directory-structure/nuxt-config
const nuxtConfig = defu(ignisFeatures, {

  // https://nuxt.com/docs/api/nuxt-config#compatibilitydate
  compatibilityDate: '2024-12-25',

  // simple eslint config - see eslint.config.mjs
  eslint: {
    config: {
      stylistic: true,
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
        // presets
        preset: {
          ui: 'off', // nuxt-ui/tailwind/off
          db: 'off', // neon/supabase/off
        },
        // individual modules
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
        content: false, // true/false
        openprops: false, // true/false
        pslo: {
          enabled: false, // true/false (elrh-pslo will (not) be used)
          content: false, // true/false (elrh-pslo will (not) be aplied on nuxt-content)
        },
      },

      // logging
      logLevel: 'info',
    },
  },
})

// https://nuxt.com/docs/getting-started/configuration#nuxt-configuration
// @ts-expect-error unknown object type
// TODO elaborate correct type for "nuxtConfig" object
export default defineNuxtConfig(nuxtConfig)
