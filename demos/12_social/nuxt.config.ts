export default defineNuxtConfig({
  extends: [
    // in real-world project you will extend from 'nuxt-ignis'
    // while having 'nuxt-ignis' as dependency in your package.json
    '../../core',
  ],

  /*
  // this config key can be used INSTEAD of .env variables
  ignis: {
    content: {
      // this will activate @nuxt-ignis/content module via a `dispatcher`
      active: true,
      // this will provide config for "Social Share" module
      // if set, this will have precedence over .env variables
      social: {
        enabled: true,
        url: 'https://nuxt-ignis.com',
      },
    },
  },

  // if set, native module options have the highest priority
  // and will OVERRIDE Nuxt Ignis config / .env vars
  socialShare: {
    baseUrl: 'https://nuxt-ignis.com',
  },
  */
})
