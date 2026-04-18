export default defineNuxtConfig({
  modules: ['@nuxt-ignis/default'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignisDefault: {
    eslint: true,
    fonts: true,
    image: true,
    scripts: true,
    security: true,
    vueuse: true,
    pinia: true,
  },
})
