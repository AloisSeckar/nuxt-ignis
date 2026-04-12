export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 05-01-valibot - how to enable Valibot validation library
  ignis: {
    valibot: true,
  },
})
