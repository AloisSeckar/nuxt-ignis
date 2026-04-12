export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 06-03-content-pslo - how to use Nuxt Content with PSLOnly integration
  ignis: {
    content: true,
    pslo: {
      enabled: true,
      content: true,
    },
  },
})
