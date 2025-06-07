// this function adresses https://github.com/AloisSeckar/nuxt-ignis/issues/70
// Nuxt Content requires its configuration to be injected and config exported
// this normally happens in content.config.ts file in project root
// however, it is not possible to transfer this config file when extending a layer
// user only have to setup small custom config file in his own project
// more info in the docs
// TODO can this be changed? can layer's "auto-imports" be configured?

import { defu } from 'defu'
import { defineCollection } from '@nuxt/content'
import { log } from './consola'

// re-export so it can be called in target apps without '@nuxt/content' dependency
export function defineContentCollection(...args: Parameters<typeof defineCollection>) {
  return defineCollection(...args)
}

// @ts-expect-error no-implicit-any
export async function loadContentConfig(userContentConfig) {
  // only if content is allowed
  if (process.env.NUXT_PUBLIC_IGNIS_CONTENT === 'true') {
    // get nuxt-ignis default
    const defaultContentConfig = await import('./config/content.config')
    // merge with possible user values
    const contentConfig = defu(userContentConfig, defaultContentConfig.default)
    return contentConfig
  }
  // otherwise there is nothing to load
  log.warn('@nuxt/content is not enabled, ensure you have NUXT_PUBLIC_IGNIS_CONTENT=true')
  return null
}
