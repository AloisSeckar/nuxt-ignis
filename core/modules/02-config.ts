import { defineNuxtModule, useLogger } from 'nuxt/kit'
import type { PublicRuntimeConfig } from 'nuxt/schema'

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
    configKey: 'ignis',
  },
  setup(options, nuxt) {
    // inject runtime config values
    const runtimeConfig = nuxt.options.runtimeConfig.public as PublicRuntimeConfig & { ignis?: { config?: IgnisConfigOptions } }
    runtimeConfig.ignis ||= {}
    runtimeConfig.ignis.config ||= {
      html: {
        lang: options.html?.lang || 'en',
        title: options.html?.title || 'Nuxt Ignis App',
      },
      nuxt: {
        ssr: options.nuxt?.ssr ?? true,
        pages: options.nuxt?.pages ?? true,
        css: options.nuxt?.css || '',
        error: options.nuxt?.error ?? true,
      },
      log: {
        level: options.log?.level || 'info',
      },
      warn: {
        duplicates: options.warn?.duplicates ?? true,
      },
    }

    logger.debug('Nuxt Ignis Config module setup called!')
  },
})
