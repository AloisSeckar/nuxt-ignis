export default defineNuxtConfig({
  modules: ['@nuxt-ignis/forms'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignisForms: {
    ignisFormkit: {
      enabled: true,
      default: 'en',
    },
  },
})
