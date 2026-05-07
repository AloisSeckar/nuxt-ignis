import { defineNuxtModule, useLogger } from 'nuxt/kit'
import type { NuxtOptions, PublicRuntimeConfig } from 'nuxt/schema'

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
    level?: 'info' | 'warn' | 'error' | 'debug'
  }
  // extra behavior
  warn?: {
    // warn when using more than one preset options
    // i.e. both 'neon' and 'supabase', or both 'valibot' and 'zod'
    duplicates?: boolean
  }
}

// this module has no configKey of its own; the actual user-provided config
// lives under `ignis.config` (configKey of the sibling 02-features module),
// which is already normalized via `applyEnv()` in its moduleDependencies hook
// before this setup runs.
export type NuxtIgnisConfigOptions = Partial<NuxtOptions> & {
  ignis: {
    config?: IgnisConfigOptions
  }
}

const logger = useLogger('ignis/config')

export default defineNuxtModule<IgnisConfigOptions>({
  meta: {
    name: 'ignis/config',
  },
  setup(_options, nuxt) {
    logger.debug('Nuxt Ignis Config module setup called!')

    const options = (nuxt.options as NuxtIgnisConfigOptions).ignis?.config ?? {}

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

    // additional processing

    // apply Nuxt config options, if they differ from defaults
    if (options.nuxt?.ssr === false) {
      nuxt.options.ssr = false
    }
    if (options.nuxt?.pages === false) {
      nuxt.options.pages = false
    }
    if (options.nuxt?.css) {
      nuxt.options.css = options.nuxt.css.split(',').map(path => path.trim())
    }

    // apply basic HTML options
    nuxt.options.app.head ||= {}
    nuxt.options.app.head.title = runtimeConfig.ignis.config.html.title
    nuxt.options.app.head.htmlAttrs = {
      ...(nuxt.options.app.head.htmlAttrs || {}), lang: runtimeConfig.ignis.config.html.lang,
    }
  },
})
