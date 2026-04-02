import { createResolver } from '@nuxt/kit'
import type { IgnisCoreOptions, NuxtIgnisCoreOptions } from './module'
import type { PublicRuntimeConfig, RuntimeConfig } from 'nuxt/schema'

export const ignisDefaultOptions: IgnisCoreOptions = {
  eslint: true,
  fonts: true,
  image: true,
  scripts: true,
  security: true,
  auth: true,
  vueuse: true,
  pinia: true,
  css: true,
}

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisCoreOptions) {
  console.debug('@nuxt-ignis/core - module dependencies are being resolved')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  let options = nuxtOptions.ignis?.core
  if (!options) {
    console.debug('@nuxt-ignis/core - No options were provided, setting defaults')
    options = { ...ignisDefaultOptions }
  }

  if (options?.eslint !== false) {
    // https://nuxt.com/modules/eslint
    modules['@nuxt/eslint'] = { }
    console.debug('@nuxt/eslint module installed')
  }

  // https://nuxt.com/modules/fonts
  if (options?.fonts !== false) {
    modules['@nuxt/fonts'] = { }
    console.debug('@nuxt/fonts module installed')
  }

  // https://image.nuxt.com/
  if (options?.image !== false) {
    modules['@nuxt/image'] = { }
    console.debug('@nuxt/image module installed')
  }

  // https://scripts.nuxt.com/
  if (options?.scripts !== false) {
    modules['@nuxt/scripts'] = { }
    console.debug('@nuxt/scripts module installed')
  }

  // https://nuxt.com/modules/security
  if (options?.security !== false) {
    modules['nuxt-security'] = { }
    console.debug('nuxt-security module installed')
  }

  // https://github.com/atinux/nuxt-auth-utils
  if (options?.auth === true) {
    modules['nuxt-auth-utils'] = { }
    console.debug('nuxt-auth-utils module installed')
  }

  // https://nuxt.com/modules/vueuse
  if (options?.vueuse !== false) {
    modules['@vueuse/nuxt'] = { }
    console.debug('@vueuse/nuxt module installed')
  }

  // https://pinia.vuejs.org/ssr/nuxt.html
  if (options?.pinia !== false) {
    modules['@pinia/nuxt'] = { }
    console.debug('@pinia/nuxt module installed')
  }

  return modules
}

export function ignisModuleSetup(nuxtOptions: NuxtIgnisCoreOptions) {
  console.debug('@nuxt-ignis/core - module setup function runs')

  const options = nuxtOptions.ignis?.core

  // inject runtime config values
  nuxtOptions.runtimeConfig ||= {
    public: {} as PublicRuntimeConfig,
  } as RuntimeConfig

  const runtimeConfig = nuxtOptions.runtimeConfig!.public as { ignis?: { core?: IgnisCoreOptions } }
  runtimeConfig.ignis ??= {}
  runtimeConfig.ignis.core ??= {}
  runtimeConfig.ignis.core.eslint ??= options?.eslint ?? true
  runtimeConfig.ignis.core.fonts ??= options?.fonts ?? true
  runtimeConfig.ignis.core.image ??= options?.image ?? true
  runtimeConfig.ignis.core.scripts ??= options?.scripts ?? true
  runtimeConfig.ignis.core.security ??= options?.security ?? true
  runtimeConfig.ignis.core.auth ??= options?.auth ?? true
  runtimeConfig.ignis.core.vueuse ??= options?.vueuse ?? true
  runtimeConfig.ignis.core.pinia ??= options?.pinia ?? true
  runtimeConfig.ignis.core.css ??= options?.css ?? true

  // additional processing
  const effectiveOptions = runtimeConfig.ignis.core

  // include default css file if enabled
  if (effectiveOptions.css) {
    nuxtOptions.css ||= []
    const resolver = createResolver(import.meta.url)
    nuxtOptions.css.push(resolver.resolve('./runtime/css/ignis.css'))
    console.debug('default CSS file included')
  }
}
