const ignisLocale = process.env.NUXT_PUBLIC_IGNIS_I18N_DEFAULT || 'en'

// https://i18n.nuxtjs.org/docs/composables/define-i18n-config
export default defineI18nConfig(() => ({
  legacy: false,
  strategy: 'no_prefix',
  locale: ignisLocale,
  locales: scanI18Names(), // will dynamically load all available locale definitions from @/i18n/locales/*
  defaultLocale: ignisLocale,
  fallbackLocale: ignisLocale,
  messages: scanI18NSources(), // will dynamically load all .jsons from @/i18n/locales/*
  warnHtmlMessage: false,
}))
