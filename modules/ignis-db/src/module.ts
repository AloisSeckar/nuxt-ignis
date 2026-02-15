import { defineNuxtModule, addPlugin, createResolver, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  neon?: boolean
  supabase?: {
    enabled?: boolean
    types?: string | false
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/db',
    configKey: 'ignisDB',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.ignis ||= { neon: false, supabase: { enabled: false, types: false as const } }

    nuxt.options.runtimeConfig.public.ignis.neon = options.neon || false
    nuxt.options.runtimeConfig.public.ignis.supabase = {
      enabled: options.supabase?.enabled || false,
      // @ts-expect-error type is not inferred correctly
      types: options.supabase?.types || false as const,
    }

    if (options.neon === true) {
      installModule('nuxt-neon')
      console.debug('nuxt-neon module installed')
    }

    if (options.supabase?.enabled === true) {
      installModule('@nuxtjs/supabase')
      // module-specific config key
      nuxt.options.runtimeConfig.public.supabase = {
        redirect: false, // https://github.com/supabase/supabase/issues/16551#issuecomment-1685300935
        types: options.supabase?.types || false as const,
      }
      console.debug('nuxt-supabase module installed')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
