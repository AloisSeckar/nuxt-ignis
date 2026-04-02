import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'
import { ignisDefaultOptions, ignisModuleDependencies, ignisModuleSetup } from './ignisCoreSetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisCoreOptions {
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

export type NuxtIgnisCoreOptions = Partial<NuxtOptions> & {
  ignis: {
    core?: IgnisCoreOptions
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    core?: IgnisCoreOptions
  }
}

export default defineNuxtModule<IgnisCoreOptions>({
  meta: {
    name: '@nuxt-ignis/core',
  },
  defaults: {
    ...ignisDefaultOptions,
  },
  moduleDependencies(nuxt) {
    return ignisModuleDependencies(nuxt.options as NuxtIgnisCoreOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisCoreOptions)

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
