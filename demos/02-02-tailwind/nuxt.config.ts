export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // 02-02-tailwind - how to use Tailwind CSS as the UI preset
  // + using "css" option for custom CSS files
  ignis: {
    preset: {
      ui: 'tailwind',
    },
    config: {
      nuxt: {
        css: '~/assets/custom.css',
      },
    },
  },
})
