export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 06-05-social - how to enable Social Share module
  ignis: {
    content: {
      // this will provide config for "Social Share" module
      social: {
        enabled: true,
        url: 'https://nuxt-ignis.com',
      },
    },
  },

  /*
  // if set, native module options have the highest priority
  // and will OVERRIDE Nuxt Ignis config / .env vars
  socialShare: {
    baseUrl: 'https://nuxt-ignis.com',
  },
  */
})
