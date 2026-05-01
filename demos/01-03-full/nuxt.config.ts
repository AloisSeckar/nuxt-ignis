export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 01-03-full - how to enable all available Nuxt Ignis features
  ignis: {
    config: {
      warn: {
        duplicates: false,
      },
    },
    content: {
      content: {
        enabled: true,
      },
      i18n: {
        default: "en",
        enabled: true,
      },
      pslo: {
        content: true,
        enabled: true,
      },
      seo: {
        enabled: true,
      },
      social: {
        enabled: true,
        url: "https://nuxt-ignis.com",
      },
    },
    db: {
      neon: {
        enabled: true,
      },
      supabase: {
        enabled: true,
        types: false,
      },
    },
    default: {
      auth: true,
      css: true,
      eslint: true,
      fonts: true,
      image: true,
      pinia: true,
      scripts: true,
      security: true,
      vueuse: true,
    },
    forms: {
      formkit: {
        default: "en",
        enabled: true,
      },
      vueform: {
        enabled: true,
      },
    },
    ui: {
      charts: true,
      openprops: true,
      tailwind: true,
      ui: true,
    },
    utils: {
      equipment: {
        enabled: true,
        composables: "",
        plugins: "",
      },
      regexp: {
        enabled: true,
      },
    },
    validation: {
      valibot: true,
      zod: true,
    },
  },
})
