export default defineNuxtConfig({
  modules: ['@nuxt-ignis/validation'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignisValidation: {
    ignisValibot: true,
  },
})
