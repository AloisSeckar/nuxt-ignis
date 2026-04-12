export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 03-01-neon - how to use Neon DB as the database preset
  ignis: {
    presets: {
      db: 'neon',
    },
  },
})
