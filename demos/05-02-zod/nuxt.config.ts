export default defineNuxtConfig({
  extends: [
    // in real-world project Nuxt Ignis will extend from 'nuxt-ignis'
    // while having it as a dependency in project's `package.json`
    '../../core',
  ],

  // to prevent possible MaxListenersExceededWarning in dev mode
  hooks: {
    'vite:serverCreated': (viteServer) => {
      viteServer.middlewares.use((_req, res, next) => {
        res.setMaxListeners(20)
        next()
      })
    },
  },

  // 05-02-zod - how to enable Zod validation library
  ignis: {
    preset: {
      validation: 'zod',
    },
  },
})
