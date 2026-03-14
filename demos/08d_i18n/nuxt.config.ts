export default defineNuxtConfig({
  extends: [
    '../../core',
  ],
  // TODO we shouldn't be forced to pass this options explicitly
  // the module should be able to provide defaults out-of-the-box...
  i18n: {
    defaultLocale: 'es',
    locales: [{ code: 'en', file: 'en.json' }, { code: 'de', file: 'de.json' }, { code: 'es', file: 'es.json' }],
  },
})
