export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 01-01-default - how Nuxt Ignis starts with NO configuration using default values only
  ignis: {
    // NO configuration is used for this case - all defaults are applied
  },
})
