export default defineNuxtConfig({
  modules: ['@nuxt-ignis/content'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignisContent: {
    content: true,
    i18n: {
      enabled: true,
      default: 'en',
    },
  },
})
