export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 06-06-seo - how to enable SEO module
  ignis: {
    content: {
      // this will provide config for "SEO" module
      seo: {
        enabled: true,
        // test https://github.com/AloisSeckar/nuxt-ignis/issues/170
        staticsite: true,
      },
    },
    // test special handling for `ssr: false` in SEO module
    config: {
      nuxt: {
        ssr: false,
      },
    },
  },
})
