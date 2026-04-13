export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 02-02-tailwind - how to use Tailwind CSS as the UI preset
  ignis: {
    preset: {
      ui: 'tailwind',
    },
  },
})
