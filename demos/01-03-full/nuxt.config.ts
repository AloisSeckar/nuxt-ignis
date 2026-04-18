export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 01-03-full - how to enable all available Nuxt Ignis features
  // TODO fix setting up full demo
  ignis: {
    ui: true,
    neon: true,
    supabase: {
      enabled: true,
    },
    i18n: {
      enabled: true,
    },
    formkit: {
      enabled: true,
    },
    vueform: true,
    content: true,
    openProps: true,
    pslo: {
      enabled: true,
      content: true,
    },
    seo: true,
    warnDuplicates: false,
  },
})
