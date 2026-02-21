import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisUtilsOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  equipment?: {
    enabled?: boolean
    composables?: string[]
    plugins?: string[]
  }
  regexp?: boolean
}

export default defineNuxtModule<IgnisUtilsOptions>({
  meta: {
    name: '@nuxt-ignis/utils',
    configKey: 'ignisUtils',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/utils - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: { utils?: IgnisUtilsOptions } }
    const options = nuxtOpts.ignisUtils || nuxtOpts.ignis?.utils

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
    if (options?.regexp === true) {
      modules['magic-regexp/nuxt'] = {}
      console.debug('magic-regexp/nuxt module installed')
    }

    return modules
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.ignis ||= {
      equipment: { enabled: false, composables: '', plugins: '' },
      regexp: false,
    }

    nuxt.options.runtimeConfig.public.ignis.equipment = {
      enabled: options.equipment?.enabled || false,
      composables: options.equipment?.composables?.join(',') || '',
      plugins: options.equipment?.plugins?.join(',') || '',
    }
    nuxt.options.runtimeConfig.public.ignis.regexp = options.regexp || false

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
