import { defineNuxtModule, addPlugin, createResolver, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  equipment?: {
    enabled: boolean
    composables?: string[]
    plugins?: string[]
  }
  regexp?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/utils',
    configKey: 'ignisUtils',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

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

    // https://www.vue.equipment/
    if (options.equipment?.enabled === true) {
      const equipmentConfig: Record<string, unknown> = {}

      if (options.equipment.composables && options.equipment.composables.length > 0) {
        equipmentConfig.composables = options.equipment.composables
      }
      if (options.equipment.plugins && options.equipment.plugins.length > 0) {
        equipmentConfig.plugins = options.equipment.plugins
      }

      installModule('@maas/vue-equipment/nuxt', Object.keys(equipmentConfig).length > 0 ? equipmentConfig : undefined)
      console.debug('@maas/vue-equipment/nuxt module installed')
    }

    // https://regexp.dev/
    if (options.regexp === true) {
      installModule('magic-regexp/nuxt')
      console.debug('magic-regexp/nuxt module installed')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
