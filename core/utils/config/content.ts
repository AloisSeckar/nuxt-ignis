// Nuxt Content requires its configuration to be injected and config exported
// this normally happens in content.config.ts file in project root
// however, it is not possible to transfer this config file when extending a layer
// user only have to setup small custom config file in his own project
// more info in the docs
// TODO can this be changed? can layer's "auto-imports" be configured?

import { defu } from 'defu'
import { defineCollection, defineContentConfig } from '@nuxt/content'
import { log } from '../consola'

// re-export so it can be called in target apps without '@nuxt/content' dependency
export function defineContentCollection(...args: Parameters<typeof defineCollection>) {
  return defineCollection(...args)
}

// @ts-expect-error no-implicit-any
// TODO set proper type for the object
export function getContentConfig(userContentConfig) {
  // only Nuxt Content is allowed
  if (process.env.NUXT_PUBLIC_IGNIS_CONTENT === 'true') {
  // defu-merge nuxt-ignis default with possible user values
    return defu(userContentConfig, defineContentConfig({
      collections: {
        content: defineCollection({
          source: '**',
          type: 'page',
        }),
      },
    }))
  }
  // otherwise throw warning and return just a dummy object
  log.warn('loadContentConfig: @nuxt/content is not enabled, settings will take no effect')
  return {}
}
