export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 06-04-i18n - how to enable internationalization (i18n)
  ignis: {
    i18n: {
      enabled: true,
      // locale: 'es',  // to check different default locale than 'en'
    },
  },

  // TODO we shouldn't be forced to pass this options explicitly
  // the module should be able to provide defaults out-of-the-box...
  i18n: {
    defaultLocale: 'fr',
    locales: [{ code: 'en', file: 'en.json' }, { code: 'de', file: 'de.json' }, { code: 'es', file: 'es.json' }, { code: 'fr', file: 'fr.json' }, { code: 'it', file: 'it.json' }],
  },
})
