import { fileURLToPath } from 'node:url'
import { defineContentCollection, loadContentConfig } from '@nuxt-ignis/content/config'

export default loadContentConfig({
  collections: {
    // Nuxt Ignis provide defaults for displaying files inside "/content" folder
    // additional collections can be defined here via exposed `defineContentCollection`
    demo: defineContentCollection({
      source: {
        // correct path needs to be resolved
        cwd: fileURLToPath(new URL('demo', import.meta.url)),
        include: '**/*.md',
      },
      type: 'page',
    }),
  },
})
