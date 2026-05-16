import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { ignisModuleDependencies, ignisModuleSetup } from './ignisContentSetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisContentOptions {
  content?: {
    enabled?: boolean
  }
  i18n?: {
    enabled?: boolean
    default?: string
  }
  seo?: {
    enabled?: boolean
    staticsite?: boolean
  }
  social?: {
    enabled?: boolean
    url?: string
  }
  pslo?: {
    enabled?: boolean
    content?: boolean
  }
}

export type NuxtIgnisContentOptions = NuxtOptions & {
  ignis: {
    content?: IgnisContentOptions
    // TODO temp workaround for seo+ssr config
    config?: {
      nuxt?: {
        ssr?: boolean
      }
    }
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    content?: IgnisContentOptions
  }
}

export default defineNuxtModule<IgnisContentOptions>({
  meta: {
    name: '@nuxt-ignis/content',
  },
  moduleDependencies(nuxt) {
    return ignisModuleDependencies(nuxt.options as NuxtIgnisContentOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisContentOptions, nuxt)

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
