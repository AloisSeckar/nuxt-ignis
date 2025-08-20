// explicit imports due to some issue with auto-loading in /demo folder
import { defineContentCollection } from '../../core/app/utils/config/content'
import { loadContentConfig } from '../../core/app/utils/content'

export default loadContentConfig({
  collections: {
    // custom collections are be defined here via exposed `defineContentCollection`
    demo: defineContentCollection({
      source: '**',
      type: 'page',
    }),
  },
})
