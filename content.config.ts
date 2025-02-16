import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  // while it is not strictily necessary to have a default config file
  // it produces warning during startup when not presented
  collections: {
    content: defineCollection({
      source: '**',
      type: 'page',
    }),
  },
})
