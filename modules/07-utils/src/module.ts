import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { ignisModuleDependencies, ignisModuleSetup } from './ignisUtilsSetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisUtilsOptions {
  equipment?: {
    enabled?: boolean
    composables?: string
    plugins?: string
  }
  regexp?: {
    enabled?: boolean
  }
}

export type NuxtIgnisUtilsOptions = NuxtOptions & {
  ignis: {
    utils?: IgnisUtilsOptions
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    utils?: IgnisUtilsOptions
  }
}

export default defineNuxtModule<IgnisUtilsOptions>({
  meta: {
    name: '@nuxt-ignis/utils',
  },
  moduleDependencies(nuxt) {
    return ignisModuleDependencies(nuxt.options as NuxtIgnisUtilsOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisUtilsOptions)

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
