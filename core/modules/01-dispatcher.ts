import { defineNuxtModule } from 'nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'
import type { IgnisCoreOptions } from '@nuxt-ignis/core'
import type { IgnisUIOptions } from '@nuxt-ignis/ui'
import type { IgnisDBOptions } from '@nuxt-ignis/db'
import type { IgnisFormsOptions } from '@nuxt-ignis/forms'
import type { IgnisValidationOptions } from '@nuxt-ignis/validation'
import type { IgnisContentOptions } from '@nuxt-ignis/content'
import type { IgnisUtilsOptions } from '@nuxt-ignis/utils'
import type { IgnisConfigOptions } from './02-config'

// Ensure all submodule keys are visible on IgnisPublicRuntimeConfig
// even when a submodule is not activated (and thus not referenced
// in the Nuxt-generated modules.d.ts).
declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    core?: IgnisCoreOptions
    ui?: IgnisUIOptions
    db?: IgnisDBOptions
    forms?: IgnisFormsOptions
    validation?: IgnisValidationOptions
    content?: IgnisContentOptions
    utils?: IgnisUtilsOptions
  }
}

export interface IgnisOptions {
  // core/modules/config.ts
  config: IgnisConfigOptions
  // @nuxt-ignis/core module
  core?: IgnisCoreOptions
  // @nuxt-ignis/ui module
  ui?: IgnisUIOptions
  // @nuxt-ignis/db module
  db?: IgnisDBOptions
  // @nuxt-ignis/forms module
  forms?: IgnisFormsOptions
  // @nuxt-ignis/validation module
  validation?: IgnisValidationOptions
  // @nuxt-ignis/content module
  content?: IgnisContentOptions
  // @nuxt-ignis/utils module
  utils?: IgnisUtilsOptions
}

export default defineNuxtModule<IgnisOptions>({
  meta: {
    name: 'ignis/dispatcher',
    configKey: 'ignis',
  },
  moduleDependencies(nuxt) {
    console.debug('Nuxt Ignis Dispatcher - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: IgnisOptions }
    const ignisOpts = nuxtOpts.ignis
    console.debug('Received options:', ignisOpts)

    if (!ignisOpts) {
      console.debug('Setting default options')
      modules['@nuxt-ignis/core'] = { }
      return modules
    }

    if (ignisOpts?.core?.active !== false) {
      modules['@nuxt-ignis/core'] = { }
    }

    if (ignisOpts?.ui?.active === true) {
      modules['@nuxt-ignis/ui'] = { }
    }
    if (ignisOpts?.db?.active === true) {
      modules['@nuxt-ignis/db'] = { }
    }

    if (ignisOpts?.forms?.active === true) {
      modules['@nuxt-ignis/forms'] = { }
    }

    if (ignisOpts?.validation?.active === true) {
      modules['@nuxt-ignis/validation'] = { }
    }

    if (ignisOpts?.content?.active === true) {
      modules['@nuxt-ignis/content'] = { }
    }

    if (ignisOpts?.utils?.active === true) {
      modules['@nuxt-ignis/utils'] = { }
    }

    return modules
  },
  setup(_options, nuxt) {
    console.debug('Nuxt Ignis Dispatcher module setup called!')

    // ensure proper runtime config type inference for modules that were not activated
    const ignis = (nuxt.options.runtimeConfig.public.ignis ||= {}) as IgnisOptions
    ignis.core ||= {
      eslint: false, fonts: false, image: false, scripts: false, security: false, auth: false, vueuse: false, pinia: false,
    }
    ignis.ui ||= {
      ui: false, tailwind: false, openprops: false, charts: false,
    }
    ignis.db ||= {
      neon: { enabled: false },
      supabase: { enabled: false, types: false },
    }
    ignis.forms ||= {
      formkit: { enabled: false, default: '', config: '' },
      vueform: { enabled: false },
    }
    ignis.validation ||= {
      zod: false, valibot: false,
    }
    ignis.content ||= {
      content: { enabled: false },
      i18n: { enabled: false, default: '', config: '' },
      seo: { enabled: false },
      social: { enabled: false, url: '' },
      pslo: { enabled: false, content: false },
    }
    ignis.utils ||= {
      equipment: { enabled: false, composables: '', plugins: '' },
      regexp: { enabled: false },
    }
  },
})
