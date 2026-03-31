export default defineNuxtConfig({
  modules: ['@nuxt-ignis/content'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignis: {
    content: {
      content: {
        enabled: true,
      },
      i18n: {
        enabled: true,
      },
    },
  },
})
