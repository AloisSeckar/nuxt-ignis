// explicit imports due to some issue with auto-loading in /demo folder
import { defineContentCollection } from '../../core/utils/config/content'
import { loadContentConfig } from '../../core/utils/content'

export default loadContentConfig({
  collections: {
    // custom collections are be defined here via exposed `defineContentCollection`
    demo: defineContentCollection({
      source: '**',
      type: 'page',
    }),
  },
})
