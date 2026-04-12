export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 01-02-bare - how to disable all default Nuxt Ignis core features (minimal setup)
  ignis: {
    core: {
      eslint: false,
      fonts: false,
      image: false,
      scripts: false,
      security: false,
      auth: false,
      vueuse: false,
      pinia: false,
      css: false,
    },
  },
})
