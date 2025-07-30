// this functions shield configuration processing
// when Nuxt Ignis' formkit.config.ts is presented
// but the related module is not allowed by .env settings

import { getFormkitConfig, type FormkitConfigOptions } from './config/formkit'

export function loadFormkitConfig(userFormkitConfig: FormkitConfigOptions) {
  // only if Formkit is allowed
  if (process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS === 'formkit' || process.env.NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED === 'true') {
    // defu-merge nuxt-ignis default with possible user values
    return getFormkitConfig(userFormkitConfig)
  }
  // otherwise throw warning and return just a dummy object
  log.warn('loadFormkitConfig: Formkit is not enabled, settings will take no effect')
  return {}
}
