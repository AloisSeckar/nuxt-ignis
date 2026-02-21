import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisValidationOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  zod?: boolean
  valibot?: boolean
}

export default defineNuxtModule<IgnisValidationOptions>({
  meta: {
    name: '@nuxt-ignis/validation',
    configKey: 'ignisValidation',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/validation - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: { validation?: IgnisValidationOptions } }
    const _options = nuxtOpts.ignisValidation || nuxtOpts.ignis?.validation

    // no modules to be activated here yet
    console.debug('@nuxt-ignis/validation - no modules to be activated')

    return modules
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.ignis ||= { zod: false, valibot: false }

    nuxt.options.runtimeConfig.public.ignis.zod = options.zod || false
    nuxt.options.runtimeConfig.public.ignis.valibot = options.valibot || false

    if (options.zod === true) {
      addImports([
        { name: 'useZod', from: resolver.resolve('runtime/app/composables/useZod') },
        { name: 'isValidByZod', from: resolver.resolve('runtime/app/utils/validationZod') },
      ])
      console.debug('zod validation enabled')
    }

    if (options.valibot === true) {
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
