export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 02-04-charts - how to enable nuxt-charts integration
  ignis: {
    ui: {
      charts: true,
    },
    // nuxt-charts don't work with SSR
    config: {
      nuxt: {
        ssr: false,
      },
    },
  },
})
