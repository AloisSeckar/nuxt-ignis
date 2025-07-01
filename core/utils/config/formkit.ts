// Formkit configuration normally happens in formkit.config.ts file in project root
// however, it is not possible to transfer this config file when extending a layer
// this way user only have to setup small custom config file in his own project
// and he can provide his own config to be defu-merged with the defaults
// more info in the docs
// TODO can this be changed? can layer's "auto-imports" be configured?

import { defu } from 'defu'

import { en, de, cs } from '@formkit/i18n'
import type { DefaultConfigOptions } from '@formkit/vue'

const ignisLocale = process.env.NUXT_PUBLIC_IGNIS_FORMKIT_DEFAULT || 'en'

export function getFormkitConfig(userFormkitConfig: FormkitConfigOptions): DefaultConfigOptions {
  return defu(userFormkitConfig, {
    locales: { en, de, cs }, // TODO allow more locales
    locale: ignisLocale,
  })
}

// for proper type inference
export type FormkitConfigOptions = DefaultConfigOptions
