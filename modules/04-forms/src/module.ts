import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisFormsOptions {
  formkit?: {
    enabled?: boolean
    default?: string
    config?: string
  }
  vueform?: {
    enabled?: boolean
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    forms?: IgnisFormsOptions
  }
}

export default defineNuxtModule<IgnisFormsOptions>({
  meta: {
    name: '@nuxt-ignis/forms',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/forms - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { forms?: IgnisFormsOptions } }
    const options = nuxtOpts.ignis?.forms

    if (options?.vueform?.enabled === true) {
      modules['@vueform/nuxt'] = { }
      console.debug('@vueform/nuxt module installed')
    }

    if (options?.formkit?.enabled === true) {
      modules['@formkit/nuxt'] = {
        defaults: {
          autoImport: true,
          default: options.formkit?.default || 'en',
          configFile: options?.formkit?.config || './formkit.config.ts',
        },
      }
      console.debug('@formkit/nuxt module installed')
    }

    return modules
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { forms?: IgnisFormsOptions } }
    const options = nuxtOpts.ignis?.forms

    // inject runtime config values
    nuxt.options.runtimeConfig.public.ignis ||= {}
    nuxt.options.runtimeConfig.public.ignis.forms ||= {
      formkit: {
        enabled: options?.formkit?.enabled || false,
        default: options?.formkit?.default || 'en',
        config: options?.formkit?.config || './formkit.config.ts',
      },
      vueform: {
        enabled: options?.vueform?.enabled || false,
      },
    }

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
