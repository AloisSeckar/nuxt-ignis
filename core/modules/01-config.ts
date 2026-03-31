import { defineNuxtModule, useLogger } from 'nuxt/kit'
import type { PublicRuntimeConfig } from 'nuxt/schema'

// shared augmentable interface for all @nuxt-ignis/* submodules
// submodules extending this via:
// `declare module 'nuxt/schema' { interface IgnisPublicRuntimeConfig { ... } }`
declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    config?: IgnisConfigOptions
  }
  interface PublicRuntimeConfig {
    ignis: IgnisPublicRuntimeConfig
  }
}

export interface IgnisConfigOptions {
  html?: {
    // HTML lang attribute,
    lang?: string
    // HTML page title,
    title?: string
  }
  // nuxt options
  nuxt?: {
    // use built-in SSR
    ssr?: boolean
    // use built-in file-based routing
    pages?: boolean
    // include custom CSS files
    css?: string
    // register central error handler
    error?: boolean // true/false
  }
  // logging
  log?: {
    // default logging level
    level?: 'info'
  }
  // extra behavior
  warn?: {
    // warn when using more than one preset options
    // i.e. both 'neon' and 'supabase', or both 'valibot' and 'zod'
    duplicates?: boolean
  }
}

const logger = useLogger('ignis/config')

export default defineNuxtModule<IgnisConfigOptions>({
  meta: {
    name: 'ignis/config',
  },
  setup(options, nuxt) {
    // inject runtime config values
    const runtimeConfig = nuxt.options.runtimeConfig.public as PublicRuntimeConfig & { ignis: { config?: IgnisConfigOptions } }
    runtimeConfig.ignis ??= {}
    runtimeConfig.ignis.config ??= {}
    runtimeConfig.ignis.config.html ??= {}
    runtimeConfig.ignis.config.html.lang ??= options.html?.lang ?? 'en'
    runtimeConfig.ignis.config.html.title ??= options.html?.title ?? 'Nuxt Ignis App'
    runtimeConfig.ignis.config.nuxt ??= {}
    runtimeConfig.ignis.config.nuxt.ssr ??= options.nuxt?.ssr ?? true
    runtimeConfig.ignis.config.nuxt.pages ??= options.nuxt?.pages ?? true
    runtimeConfig.ignis.config.nuxt.css ??= options.nuxt?.css ?? ''
    runtimeConfig.ignis.config.nuxt.error ??= options.nuxt?.error ?? true
    runtimeConfig.ignis.config.log ??= {}
    runtimeConfig.ignis.config.log.level ??= options.log?.level ?? 'info'
    runtimeConfig.ignis.config.warn ??= {}
    runtimeConfig.ignis.config.warn.duplicates ??= options.warn?.duplicates ?? true

    logger.debug('Nuxt Ignis Config module setup called!')
  },
})
