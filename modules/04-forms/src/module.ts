import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { ignisModuleDependencies, ignisModuleSetup } from './ignisFormsSetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisFormsOptions {
  formkit?: {
    enabled?: boolean
    default?: string
    config?: string
  }
  vueform?: {
    enabled?: boolean
  }
}

export type NuxtIgnisFormsOptions = NuxtOptions & {
  ignis: {
    forms?: IgnisFormsOptions
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    forms?: IgnisFormsOptions
  }
}

export default defineNuxtModule<IgnisFormsOptions>({
  meta: {
    name: '@nuxt-ignis/forms',
  },
  moduleDependencies(nuxt) {
    return ignisModuleDependencies(nuxt.options as NuxtIgnisFormsOptions)
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    ignisModuleSetup(nuxt.options as NuxtIgnisFormsOptions, resolver.resolve('./runtime'))

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
