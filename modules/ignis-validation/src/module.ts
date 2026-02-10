import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'

export interface ModuleOptions {
  zod?: boolean
  valibot?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/validation',
    configKey: 'ignisValidation',
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
