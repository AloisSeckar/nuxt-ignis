import { createResolver, addImports } from '@nuxt/kit'
import type { IgnisValidationOptions, NuxtIgnisValidationOptions } from './module'

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisValidationOptions) {
  console.debug('@nuxt-ignis/validation - module dependencies are being resolved')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  const _options = nuxtOptions.ignis?.validation

  // no modules to be activated here yet
  console.debug('@nuxt-ignis/validation - no modules to be activated')

  return modules
}

export function ignisModuleSetup(nuxtOptions: NuxtIgnisValidationOptions) {
  console.debug('@nuxt-ignis/validation - module setup function runs')

  const resolver = createResolver(import.meta.url)

  const options = nuxtOptions.ignis?.validation

  // inject runtime config values
  const runtimeConfig = nuxtOptions.runtimeConfig.public as { ignis?: { validation?: IgnisValidationOptions } }
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
}
