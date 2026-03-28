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
      console.debug('Setting default options')
      modules['@nuxt-ignis/core'] = { }
      return modules
    }

    if (ignisOpts?.core?.active !== false) {
      modules['@nuxt-ignis/core'] = { }
    }

    if (ignisOpts?.ui?.active === true) {
      let uiPreset
      switch (ignisOpts.preset?.ui) {
        case 'nuxt-ui':
          uiPreset = { ui: true }
          break
        case 'tailwind':
          uiPreset = { tailwind: true }
          break
        case 'off':
          uiPreset = undefined
          break
        default:
          if (ignisOpts.preset?.ui) {
            console.warn(`Invalid UI preset value "${ignisOpts.preset.ui}" provided. Supported values are "nuxt-ui" | "tailwind" | "off". Defaulting to "off".`)
          }
          uiPreset = undefined
      }
      modules['@nuxt-ignis/ui'] = {
        defaults: uiPreset,
      }
    }
    if (ignisOpts?.db?.active === true) {
      let dbPreset
      switch (ignisOpts.preset?.db) {
        case 'neon':
          dbPreset = { neon: true }
          break
        case 'supabase':
          dbPreset = { supabase: true }
          break
        case 'off':
          dbPreset = undefined
          break
        default:
          if (ignisOpts.preset?.db) {
            console.warn(`Invalid DB preset value "${ignisOpts.preset.db}" provided. Supported values are "neon" | "supabase" | "off". Defaulting to "off".`)
          }
          dbPreset = undefined
      }
      modules['@nuxt-ignis/db'] = {
        defaults: dbPreset,
      }
    }

    if (ignisOpts?.forms?.active === true) {
      let formsPreset
      switch (ignisOpts.preset?.forms) {
        case 'vueform':
          formsPreset = { vueform: { enabled: true } }
          break
        case 'formkit':
          formsPreset = { formkit: { enabled: true } }
          break
        case 'off':
          formsPreset = undefined
          break
        default:
          if (ignisOpts.preset?.forms) {
            console.warn(`Invalid Forms preset value "${ignisOpts.preset.forms}" provided. Supported values are "vueform" | "formkit" | "off". Defaulting to "off".`)
          }
          formsPreset = undefined
      }
      modules['@nuxt-ignis/forms'] = {
        defaults: formsPreset,
      }
    }

    if (ignisOpts?.validation?.active === true) {
      let validationPreset
      switch (ignisOpts.preset?.validation) {
        case 'zod':
          validationPreset = { zod: true }
          break
        case 'valibot':
          validationPreset = { valibot: true }
          break
        case 'off':
          validationPreset = undefined
          break
        default:
          if (ignisOpts.preset?.validation) {
            console.warn(`Invalid Validation preset value "${ignisOpts.preset.validation}" provided. Supported values are "zod" | "valibot" | "off". Defaulting to "off".`)
          }
          validationPreset = undefined
      }
      modules['@nuxt-ignis/validation'] = {
        defaults: validationPreset,
      }
    }

    if (ignisOpts?.content?.active === true) {
      modules['@nuxt-ignis/content'] = { }
    }

    if (ignisOpts?.utils?.active === true) {
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
