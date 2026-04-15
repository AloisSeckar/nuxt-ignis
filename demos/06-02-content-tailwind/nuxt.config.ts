export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 06-02-content-tailwind - how to use Nuxt Content with Tailwind CSS
  ignis: {
    content: {
      content: {
        enabled: true,
      },
    },
    ui: {
      tailwind: true,
    },
  },
})
