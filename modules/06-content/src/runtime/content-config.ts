// Merges user Nuxt Content config with Nuxt Ignis defaults and returns the result
// Used by user-provided `content.config.ts` files (or by an auto-generated template)

import { defu } from 'defu'
import { defineCollection, defineContentConfig } from '@nuxt/content'

// re-export so it can be called in target apps without '@nuxt/content' dependency
export function defineContentCollection(...args: Parameters<typeof defineCollection>) {
  return defineCollection(...args)
}

// @ts-expect-error no-implicit-any
// TODO set proper type for the object
export function loadContentConfig(userContentConfig) {
  // only proceed when @nuxt/content is enabled via @nuxt-ignis/content
  if (process.env.NUXT_PUBLIC_IGNIS_CONTENT_CONTENT_ENABLED === 'true') {
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
  console.warn('loadContentConfig: @nuxt/content is not enabled, settings will take no effect')
  return {}
}
