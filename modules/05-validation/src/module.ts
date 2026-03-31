import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisValidationOptions {
  zod?: boolean
  valibot?: boolean
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
    console.debug('@nuxt-ignis/validation - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { validation?: IgnisValidationOptions } }
    const _options = nuxtOpts.ignis?.validation

    // no modules to be activated here yet
    console.debug('@nuxt-ignis/validation - no modules to be activated')

    return modules
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { validation?: IgnisValidationOptions } }
    const options = nuxtOpts.ignis?.validation

    // inject runtime config values
    const runtimeConfig = nuxt.options.runtimeConfig.public as { ignis?: { validation?: IgnisValidationOptions } }
    runtimeConfig.ignis ??= {}
    runtimeConfig.ignis.validation ??= {}
    runtimeConfig.ignis.validation.zod ??= options?.zod ?? false
    runtimeConfig.ignis.validation.valibot ??= options?.valibot ?? false

    // additional processing
    const effectiveOptions = runtimeConfig.ignis.validation

    if (effectiveOptions.zod === true) {
      addImports([
        { name: 'useZod', from: resolver.resolve('runtime/app/composables/useZod') },
        { name: 'isValidByZod', from: resolver.resolve('runtime/app/utils/validationZod') },
      ])
      console.debug('zod validation enabled')
    }

    if (effectiveOptions.valibot === true) {
      addImports([
        { name: 'useValibot', from: resolver.resolve('runtime/app/composables/useValibot') },
        { name: 'isValidByValibot', from: resolver.resolve('runtime/app/utils/validationValibot') },
      ])
      console.debug('valibot validation enabled')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
