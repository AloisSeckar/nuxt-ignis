import type { IgnisUtilsOptions, NuxtIgnisUtilsOptions } from './module'

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisUtilsOptions) {
  console.debug('@nuxt-ignis/utils - module dependencies are being resolved')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  const options = nuxtOptions.ignis?.utils

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
}

export function ignisModuleSetup(nuxtOptions: NuxtIgnisUtilsOptions) {
  console.debug('@nuxt-ignis/utils - module setup function runs')

  const options = nuxtOptions.ignis?.utils

  // inject runtime config values
  const runtimeConfig = nuxtOptions.runtimeConfig.public as { ignis?: { utils?: IgnisUtilsOptions } }
  runtimeConfig.ignis ??= {}
  runtimeConfig.ignis.utils ??= {}
  runtimeConfig.ignis.utils.equipment ??= {}
  runtimeConfig.ignis.utils.equipment.enabled ??= options?.equipment?.enabled ?? false
  runtimeConfig.ignis.utils.equipment.composables ??= options?.equipment?.composables ?? ''
  runtimeConfig.ignis.utils.equipment.plugins ??= options?.equipment?.plugins ?? ''
  runtimeConfig.ignis.utils.regexp ??= {}
  runtimeConfig.ignis.utils.regexp.enabled ??= options?.regexp?.enabled ?? false
}
