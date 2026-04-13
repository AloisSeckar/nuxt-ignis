export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 02-01-nuxt-ui - how to use Nuxt UI as the UI preset
  ignis: {
    preset: {
      ui: 'nuxt-ui',
    },
  },
})
