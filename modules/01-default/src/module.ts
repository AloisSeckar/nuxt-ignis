import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { ignisDefaultOptions, ignisModuleDependencies, ignisModuleSetup } from './ignisDefaultSetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisDefaultOptions {
  eslint?: boolean
  fonts?: boolean
  image?: boolean
  scripts?: boolean
  security?: boolean
  vueuse?: boolean
  pinia?: boolean
  auth?: boolean
  // include default css file
  css?: boolean
}

export type NuxtIgnisDefaultOptions = Partial<NuxtOptions> & {
  ignis: {
    default?: IgnisDefaultOptions
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    default?: IgnisDefaultOptions
  }
}

export default defineNuxtModule<IgnisDefaultOptions>({
  meta: {
    name: '@nuxt-ignis/default',
  },
  defaults: {
    ...ignisDefaultOptions,
  },
  moduleDependencies(nuxt) {
    return ignisModuleDependencies(nuxt.options as NuxtIgnisDefaultOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisDefaultOptions)

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
