import { defineNuxtModule, addPlugin, createResolver, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  formkit: {
    enabled: boolean
    default: string
    config: string
  }
  vueform: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/forms',
    configKey: 'ignisForms',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.ignis ||= {
      formkit: {
        enabled: false,
        default: 'en',
        config: './formkit.config.ts',
      },
      vueform: false,
    }

    nuxt.options.runtimeConfig.public.ignis.formkit = {
      enabled: options.formkit?.enabled || false,
      default: options.formkit?.default || 'en',
      config: options.formkit?.config || './formkit.config.ts',
    }
    nuxt.options.runtimeConfig.public.ignis.vueform = options.vueform || false

    if (options.vueform === true) {
      installModule('@vueform/nuxt')
      console.debug('@vueform/nuxt module installed')
    }

    if (options.formkit?.enabled === true) {
      installModule('@formkit/nuxt', {
        autoImport: true,
        configFile: options.formkit?.config || './formkit.config.ts',
      })
      console.debug('@formkit/nuxt module installed')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
