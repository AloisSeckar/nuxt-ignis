import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { ignisModuleDependencies, ignisModuleSetup } from './ignisUISetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisUIOptions {
  ui?: boolean
  tailwind?: boolean
  openprops?: boolean
  charts?: boolean
}

export type NuxtIgnisUIOptions = NuxtOptions & {
  ignis: {
    ui?: IgnisUIOptions
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    ui?: IgnisUIOptions
  }
}

export default defineNuxtModule<IgnisUIOptions>({
  meta: {
    name: '@nuxt-ignis/ui',
  },
  moduleDependencies(nuxt) {
    return ignisModuleDependencies(nuxt.options as NuxtIgnisUIOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisUIOptions)

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
