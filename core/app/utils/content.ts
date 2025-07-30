// this functions shield configuration processing
// when Nuxt Ignis' content.config.ts is presented
// but the related module is not allowed by .env settings

import { getContentConfig } from './config/content'

// @ts-expect-error no-implicit-any
// TODO set proper type for the object
export function loadContentConfig(userContentConfig) {
  // only Nuxt Content is allowed
  if (process.env.NUXT_PUBLIC_IGNIS_CONTENT === 'true') {
    // defu-merge nuxt-ignis default with possible user values
    return getContentConfig(userContentConfig)
  }
  // otherwise throw warning and return just a dummy object
  log.warn('loadContentConfig: @nuxt/content is not enabled, settings will take no effect')
  return {}
}
