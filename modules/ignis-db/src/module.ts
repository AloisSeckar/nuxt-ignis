import { defineNuxtModule, addPlugin, createResolver, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  ignisNeon?: boolean
  ignisSupabase?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/db',
    configKey: 'ignisDB',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.ignis ||= { neon: false, supabase: false }

    nuxt.options.runtimeConfig.public.ignis.neon = options.ignisNeon || false
    nuxt.options.runtimeConfig.public.ignis.supabase = options.ignisSupabase || false

    if (options.ignisNeon === true) {
      installModule('nuxt-neon')
      console.debug('nuxt-neon module installed')
    }

    if (options.ignisSupabase === true) {
      installModule('@nuxtjs/supabase')
      // module-specific config key
      nuxt.options.runtimeConfig.public.supabase = {
        redirect: false, // https://github.com/supabase/supabase/issues/16551#issuecomment-1685300935
      }
      console.debug('nuxt-supabase module installed')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
