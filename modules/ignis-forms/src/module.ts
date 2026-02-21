import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisFormsOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  formkit?: {
    enabled?: boolean
    default?: string
    config?: string
  }
  vueform?: boolean
}

export default defineNuxtModule<IgnisFormsOptions>({
  meta: {
    name: '@nuxt-ignis/forms',
    configKey: 'ignisForms',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/forms - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: { forms?: IgnisFormsOptions } }
    const options = nuxtOpts.ignisForms || nuxtOpts.ignis?.forms

    if (options?.vueform === true) {
      modules['@vueform/nuxt'] = { }
      console.debug('@vueform/nuxt module installed')
    }

    if (options?.formkit?.enabled === true) {
      modules['@formkit/nuxt'] = {
        autoImport: true,
        default: options.formkit?.default || 'en',
        configFile: options?.formkit?.config || './formkit.config.ts',
      }
      console.debug('@formkit/nuxt module installed')
    }

    return modules
  },
  setup(options, nuxt) {
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

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
