// this functions shield configuration processing
// when Nuxt Ignis' vueform.config.ts is presented
// but the related module is not allowed by .env settings

import { getVueformConfig } from './config/vueform'

// @ts-expect-error no-implicit-any
// TODO set proper type for the object
export function loadVueformConfig(userVueformConfig) {
  // only if Vueform is allowed
  const config = useRuntimeConfig().public.ignis
  if (config.preset.forms === 'vueform' || config.vueform === true) {
    // defu-merge nuxt-ignis default with possible user values
    return getVueformConfig(userVueformConfig)
  }
  // otherwise throw warning and return just a dummy object
  log.warn('loadVueformConfig: Vueform is not enabled, settings will take no effect')
  return {}
}
