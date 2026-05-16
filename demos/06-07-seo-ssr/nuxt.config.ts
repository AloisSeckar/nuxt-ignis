export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 06-07-seo-ssr - how to enable SEO module running in SSR mode
  ignis: {
    content: {
      // this will provide config for "SEO" module
      seo: {
        enabled: true,
      },
    },
  },
})
