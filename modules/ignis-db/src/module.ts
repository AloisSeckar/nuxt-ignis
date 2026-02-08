import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  ignisPresetDB?: 'neon' | 'supabase' | 'off'
  ignisNeon?: boolean
  ignisSupabase?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/db',
      configKey: 'ignisDB',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    ignisPresetDB: 'off',
    ignisNeon: false,
    ignisSupabase: false,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.ignis ||= { preset: { db: 'off' }, neon: false, supabase: false }

    nuxt.options.runtimeConfig.public.ignis.preset.db = options.ignisPresetDB || 'off'
    nuxt.options.runtimeConfig.public.ignis.neon = options.ignisNeon || false
    nuxt.options.runtimeConfig.public.ignis.supabase = options.ignisSupabase || false

    // evaluate runtime config
    let dbPreset = process.env.NUXT_PUBLIC_IGNIS_PRESET_DB
    if (dbPreset && !['neon', 'supabase'].includes(dbPreset)) {
      // surpress other values
      process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = dbPreset = 'off'
    }

    if (options.ignisPresetDB === 'neon' || options.ignisNeon === true) {
      nuxt.options.modules.push('nuxt-neon')
    }

    if (options.ignisPresetDB === 'supabase' || options.ignisSupabase === true) {
      // module definition
      nuxt.options.modules.push('@nuxtjs/supabase')
      // module-specific config key
      nuxt.options.runtimeConfig.public.supabase = {
        redirect: false, // https://github.com/supabase/supabase/issues/16551#issuecomment-1685300935
      }
    }

    console.log(nuxt.options.modules)
    console.log(nuxt.options.runtimeConfig.public)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
