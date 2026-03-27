export default defineNuxtConfig({
  modules: ['@nuxt-ignis/core'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignisCore: {
    eslint: true,
    fonts: true,
    image: true,
    scripts: true,
    security: true,
    vueuse: true,
    pinia: true,
  },
})
