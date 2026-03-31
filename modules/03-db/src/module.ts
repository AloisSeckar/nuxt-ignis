import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisDBOptions {
  neon?: {
    enabled?: boolean
  }
  supabase?: {
    enabled?: boolean
    types?: string | false
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    db?: IgnisDBOptions
  }
}

export default defineNuxtModule<IgnisDBOptions>({
  meta: {
    name: '@nuxt-ignis/db',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/db - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { db?: IgnisDBOptions } }
    const options = nuxtOpts.ignis?.db

    if (options?.neon?.enabled === true) {
      modules['nuxt-neon'] = { }
      console.debug('nuxt-neon module installed')
    }

    if (options?.supabase?.enabled === true) {
      modules['@nuxtjs/supabase'] = {
        defaults: {
          redirect: false, // https://github.com/supabase/supabase/issues/16551#issuecomment-1685300935
          types: options.supabase?.types || false as const,
        },
      }
      console.debug('@nuxtjs/supabase module installed')
    }

    return modules
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { db?: IgnisDBOptions } }
    const options = nuxtOpts.ignis?.db

    // inject runtime config values
    const runtimeConfig = nuxt.options.runtimeConfig.public as { ignis?: { db?: IgnisDBOptions } }
    runtimeConfig.ignis ||= {}
    runtimeConfig.ignis.db ||= {
      neon: {
        enabled: options?.neon?.enabled || false,
      },
      supabase: {
        enabled: options?.supabase?.enabled || false,
        types: options?.supabase?.types || false,
      },
    }

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
