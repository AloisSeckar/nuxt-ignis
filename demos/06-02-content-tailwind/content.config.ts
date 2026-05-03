// explicit imports due to some issue with auto-loading in /demo folder
import { defineContentCollection, loadContentConfig } from '@nuxt-ignis/content/config'

export default loadContentConfig({
  collections: {
    // custom collections are be defined here via exposed `defineContentCollection`
    demo: defineContentCollection({
      source: '**',
      type: 'page',
    }),
  },
})
