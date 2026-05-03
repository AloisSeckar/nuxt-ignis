// explicit imports due to some issue with auto-loading in /demo folder
import { defineContentCollection, loadContentConfig } from '#ignis-content/content-config'

export default loadContentConfig({
  collections: {
    // custom collections are be defined here via exposed `defineContentCollection`
    demo: defineContentCollection({
      source: '**',
      type: 'page',
    }),
  },
})
