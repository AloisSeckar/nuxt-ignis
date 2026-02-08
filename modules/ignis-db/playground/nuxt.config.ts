export default defineNuxtConfig({
  modules: ['@nuxt-ignis/db'],
  devtools: { enabled: true },
  compatibilityDate: 'latest',
  ignisDB: {
    ignisPresetDB: 'supabase',
  },
})
