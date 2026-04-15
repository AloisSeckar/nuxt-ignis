export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 07-01-equipment - how to enable Equipment plugins (MagicNoise, MagicMarquee)
  ignis: {
    ui: {
      tailwind: true,
    },
    utils: {
      equipment: {
        enabled: true,
        plugins: ['MagicNoise', 'MagicMarquee'],
      },
    },
  },
})
