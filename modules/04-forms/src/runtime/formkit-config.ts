// Merges user FormKit config with Nuxt Ignis defaults and returns the result
// Used by the auto-generated formkit.config template or by custom user config files

import { defu } from 'defu'

import { en, de, cs } from '@formkit/i18n'
import type { DefaultConfigOptions } from '@formkit/vue'

const ignisLocale = process.env.NUXT_PUBLIC_IGNIS_FORMKIT_DEFAULT || 'en'

export function loadFormkitConfig(userFormkitConfig: FormkitConfigOptions): DefaultConfigOptions {
  return defu(userFormkitConfig, {
    locales: { en, de, cs }, // TODO allow more locales
    locale: ignisLocale,
  })
}

// for proper type inference
export type FormkitConfigOptions = DefaultConfigOptions
