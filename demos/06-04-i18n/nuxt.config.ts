export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 06-04-i18n - how to enable internationalization (i18n)
  ignis: {
    content: {
      i18n: {
        enabled: true,
        // to set different default locale than 'en'
        // locale: 'es',  
      },
    },
  },
})
