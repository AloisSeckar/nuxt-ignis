export default defineNuxtConfig({
  extends: [
    // in real-world project you will extend from 'nuxt-ignis'
    // while having 'nuxt-ignis' as dependency in your package.json
    '../../core',
  ],

  /*
  ignisContent: {
    social: {
      // TODO this is currently not enough to enable the module, .env variable is required for this
      enabled: true,
      // however, once enabled, this will have precedence over .env variable
      url: 'https://nuxt-migni.com',
    },
  },
  socialShare: {
    // this has the highest priority and will overwrite Nuxt Ignis config / .env variable
    baseUrl: 'https://nuxt-ignis.com',
  },
  */
})
