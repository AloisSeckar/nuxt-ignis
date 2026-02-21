import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisDBOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  neon?: boolean
  supabase?: {
    enabled?: boolean
    types?: string | false
  }
}

export default defineNuxtModule<IgnisDBOptions>({
  meta: {
    name: '@nuxt-ignis/db',
    configKey: 'ignisDB',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/db - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: { db?: IgnisDBOptions } }
    const options = nuxtOpts.ignisDB || nuxtOpts.ignis?.db

    if (options?.neon === true) {
      modules['nuxt-neon'] = { }
      console.debug('nuxt-neon module installed')
    }

    if (options?.supabase?.enabled === true) {
      modules['@nuxtjs/supabase'] = {
        redirect: false, // https://github.com/supabase/supabase/issues/16551#issuecomment-1685300935
        types: options.supabase?.types || false as const,
      }
      console.debug('@nuxtjs/supabase module installed')
    }

    return modules
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.ignis ||= { neon: false, supabase: { enabled: false, types: false as const } }

    nuxt.options.runtimeConfig.public.ignis.neon = options.neon || false
    nuxt.options.runtimeConfig.public.ignis.supabase = {
      enabled: options.supabase?.enabled || false,
      // @ts-expect-error type is not inferred correctly
      types: options.supabase?.types || false as const,
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
