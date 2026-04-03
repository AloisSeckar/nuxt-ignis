import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { ignisModuleDependencies, ignisModuleSetup } from './ignisDBSetup'
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

export type NuxtIgnisDBOptions = NuxtOptions & {
  ignis: {
    db?: IgnisDBOptions
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
    return ignisModuleDependencies(nuxt.options as NuxtIgnisDBOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisDBOptions)

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
