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

  // it is recommended to AVOID using this module-specific config key for clarity
  ignisContent: {
    // WARNING: this would not work as `dispatcher` module only reads `ignis` config key!
    active: true,
    // this CAN be used to override `ignis.social` config key,
    // providing `ignis.content.active` is set to true (otherwise this cannot be processed)
    social: {
      enabled: true,
      url: 'https://nuxt-ignis.com',
    },
  },

  // if set, this has the highest priority and will OVERRIDE Nuxt Ignis config / .env vars
  socialShare: {
    baseUrl: 'https://nuxt-ignis.com',
  },
  */
})
