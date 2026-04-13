export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 04-02-formkit - how to use FormKit as the forms preset
  ignis: {
    preset: {
      forms: 'formkit',
    },
  },
})
