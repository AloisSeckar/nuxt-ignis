export default defineNuxtConfig({
  extends: [
    // in real-world project you will extend from 'nuxt-ignis'
    // while having 'nuxt-ignis' as dependency in your package.json
    '../../core',
  ],
  /*
  ignis: {
    social: {
      enabled: true,
      // TODO currently this option is not being picked up
      url: 'https://nuxt-migni.com',
    },
  },
  */
  /*
  socialShare: {
    // this will get precedence over ignis env variable
    // baseUrl: 'https://nuxt-ignis.com',
  },
  */
})
