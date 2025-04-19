// https://formkit.com/guides/optimizing-for-production#using-the-nuxt-module
import { en, de, cs } from '@formkit/i18n'
import type { DefaultConfigOptions } from '@formkit/vue'

const ignisLocale = process.env.NUXT_PUBLIC_IGNIS_FORMKIT_DEFAULT || 'en'

const config: DefaultConfigOptions = {
  locales: { en, de, cs }, // TODO allow multiple locales
  locale: ignisLocale,
}

export default config
