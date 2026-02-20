export default defineNuxtConfig({
  extends: [
    '../../core',
  ],

  // use nuxt config options to enable Ignis features
  ignis: {
    ui: { enabled: true },
    db: { enabled: true },
    forms: { enabled: true },
    validation: { enabled: true },
    content: { enabled: true },
    utils: { enabled: true },
  },
  ignisContent: {
    content: {
      enabled: true,
    },
    i18n: {
      enabled: false, // temporarily not working
    },
    seo: {
      enabled: true,
    },
    social: {
      enabled: true,
    },
    pslo: {
      enabled: true,
      content: true,
    },
  },

  // POC of module dispatcher
  ignisModules: {
    content: true,
  },
})
