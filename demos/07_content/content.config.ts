import { defineContentCollection, loadContentConfig } from '../../core/utils/content'

export default loadContentConfig({
  collections: {
    // custom collections are be defined here via exposed `defineContentCollection`
    demo: defineContentCollection({
      source: '**',
      type: 'page',
    }),
  },
})
