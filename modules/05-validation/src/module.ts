import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { ignisModuleDependencies, ignisModuleSetup } from './ignisValidationSetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisValidationOptions {
  zod?: boolean
  valibot?: boolean
}

export type NuxtIgnisValidationOptions = NuxtOptions & {
  ignis: {
    validation?: IgnisValidationOptions
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    validation?: IgnisValidationOptions
  }
}

export default defineNuxtModule<IgnisValidationOptions>({
  meta: {
    name: '@nuxt-ignis/validation',
  },
  moduleDependencies(nuxt) {
    return ignisModuleDependencies(nuxt.options as NuxtIgnisValidationOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisValidationOptions)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
