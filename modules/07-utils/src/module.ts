import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisUtilsOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  equipment?: {
    enabled?: boolean
    composables?: string
    plugins?: string
  }
  regexp?: {
    enabled?: boolean
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    utils?: IgnisUtilsOptions
  }
}

export default defineNuxtModule<IgnisUtilsOptions>({
  meta: {
    name: '@nuxt-ignis/utils',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/utils - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { utils?: IgnisUtilsOptions } }
    const options = nuxtOpts.ignis?.utils

    // https://www.vue.equipment/
    if (options?.equipment?.enabled === true) {
      const equipmentConfig: Record<string, unknown> = {}

      if (options.equipment.composables && options.equipment.composables.length > 0) {
        equipmentConfig.composables = options.equipment.composables
      }
      if (options.equipment.plugins && options.equipment.plugins.length > 0) {
        equipmentConfig.plugins = options.equipment.plugins
      }

      modules['@maas/vue-equipment/nuxt'] = equipmentConfig
      console.debug('@maas/vue-equipment/nuxt module installed')
    }

    // https://regexp.dev/
    if (options?.regexp?.enabled === true) {
      modules['magic-regexp/nuxt'] = {}
      console.debug('magic-regexp/nuxt module installed')
    }

    return modules
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { utils?: IgnisUtilsOptions } }
    const options = nuxtOpts.ignis?.utils

    // inject runtime config values
    nuxt.options.runtimeConfig.public.ignis ||= {}
    nuxt.options.runtimeConfig.public.ignis.utils ||= {
      equipment: {
        enabled: options?.equipment?.enabled || false,
        composables: options?.equipment?.composables || '',
        plugins: options?.equipment?.plugins || '',
      },
      regexp: {
        enabled: options?.regexp?.enabled || false,
      },
    }

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
