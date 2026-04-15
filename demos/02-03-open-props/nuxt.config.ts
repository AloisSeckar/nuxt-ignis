export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 02-03-open-props - how to enable Open Props CSS framework
  ignis: {
    ui: {
      openprops: true,
    },
  },
})
