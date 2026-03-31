import { defineNuxtModule } from 'nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'
import type { IgnisConfigOptions } from './01-config'
import type { IgnisCoreOptions } from '@nuxt-ignis/core'
import type { IgnisUIOptions } from '@nuxt-ignis/ui'
import type { IgnisDBOptions } from '@nuxt-ignis/db'
import type { IgnisFormsOptions } from '@nuxt-ignis/forms'
import type { IgnisValidationOptions } from '@nuxt-ignis/validation'
import type { IgnisContentOptions } from '@nuxt-ignis/content'
import type { IgnisUtilsOptions } from '@nuxt-ignis/utils'
import { resolveUiPreset, resolveDbPreset, resolveFormsPreset, resolveValidationPreset } from './utils/presets'
import { isCoreActive, isUiActive, isDbActive, isFormsActive, isValidationActive, isContentActive, isUtilsActive } from './utils/activation'

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

export interface IgnisPresetOptions {
  ui?: 'nuxt-ui' | 'tailwind' | 'off'
  db?: 'neon' | 'supabase' | 'off'
  forms?: 'vueform' | 'formkit' | 'off'
  validation?: 'zod' | 'valibot' | 'off'
}

export interface IgnisOptions {
  // core/modules/config.ts
  config?: IgnisConfigOptions
  // core/modules/features.ts
  preset?: IgnisPresetOptions
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
    name: 'ignis/features',
    configKey: 'ignis',
  },
  moduleDependencies(nuxt) {
    console.debug('Nuxt Ignis Features - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: IgnisOptions }
    const ignisOpts = nuxtOpts.ignis
    console.debug('Received options:', ignisOpts)

    if (!ignisOpts) {
      console.debug('No Ignis options provided. Setting defaults.')
      modules['@nuxt-ignis/core'] = { }
      return modules
    }

    if (isCoreActive(ignisOpts)) {
      modules['@nuxt-ignis/core'] = { }
    }

    if (isUiActive(ignisOpts)) {
      modules['@nuxt-ignis/ui'] = {
        defaults: resolveUiPreset(ignisOpts.preset?.ui),
      }
    }

    if (isDbActive(ignisOpts)) {
      modules['@nuxt-ignis/db'] = {
        defaults: resolveDbPreset(ignisOpts.preset?.db),
      }
    }

    if (isFormsActive(ignisOpts)) {
      modules['@nuxt-ignis/forms'] = {
        defaults: resolveFormsPreset(ignisOpts.preset?.forms),
      }
    }

    if (isValidationActive(ignisOpts)) {
      modules['@nuxt-ignis/validation'] = {
        defaults: resolveValidationPreset(ignisOpts.preset?.validation),
      }
    }

    if (isContentActive(ignisOpts)) {
      modules['@nuxt-ignis/content'] = { }
    }

    if (isUtilsActive(ignisOpts)) {
      modules['@nuxt-ignis/utils'] = { }
    }

    console.warn(modules)

    return modules
  },
  setup(_options, nuxt) {
    console.debug('Nuxt Ignis Features module setup called!')

    // ensure proper runtime config type inference for modules that were not activated
    const ignis = (nuxt.options.runtimeConfig.public.ignis ||= {}) as IgnisOptions
    ignis.core ||= {
      eslint: false, fonts: false, image: false, scripts: false, security: false, auth: false, vueuse: false, pinia: false,
    }
    ignis.preset ||= {
      ui: 'off', db: 'off', forms: 'off', validation: 'off',
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
      i18n: { enabled: false, default: '' },
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
