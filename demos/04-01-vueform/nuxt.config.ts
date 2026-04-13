export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 04-01-vueform - how to use Vueform as the forms preset
  ignis: {
    preset: {
      forms: 'vueform',
    },
    ssr: false,  // the form is <ClientOnly> anyway
  },
})
