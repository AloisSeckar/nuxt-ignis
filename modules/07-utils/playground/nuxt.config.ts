export default defineNuxtConfig({
  modules: ['@nuxt-ignis/utils'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignisUtils: {
    equipment: {
      enabled: true,
    },
    regexp: true,
  },
})
