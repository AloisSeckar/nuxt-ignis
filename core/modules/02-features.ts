import { defineNuxtModule } from 'nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'
import type { IgnisConfigOptions } from './01-config'
import type { IgnisDefaultOptions } from '@nuxt-ignis/default'
import type { IgnisUIOptions } from '@nuxt-ignis/ui'
import type { IgnisDBOptions } from '@nuxt-ignis/db'
import type { IgnisFormsOptions } from '@nuxt-ignis/forms'
import type { IgnisValidationOptions } from '@nuxt-ignis/validation'
import type { IgnisContentOptions } from '@nuxt-ignis/content'
import type { IgnisUtilsOptions } from '@nuxt-ignis/utils'
import { envApply } from './utils/env-apply'
import { envValidate } from './utils/env-validate'
import { checkForDuplicateModules } from './utils/duplicates'
import { resolveUiPreset, resolveDbPreset, resolveFormsPreset, resolveValidationPreset } from './utils/presets'
import { isDefaultActive, isUiActive, isDbActive, isFormsActive, isValidationActive, isContentActive, isUtilsActive } from './utils/activation'

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    default?: IgnisDefaultOptions
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
  // @nuxt-ignis/default module
  default?: IgnisDefaultOptions
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
    if (!nuxtOpts.ignis) {
      nuxtOpts.ignis = {}
    }
    const ignisOpts = nuxtOpts.ignis

    // Nuxt Ignis supports configuration via .env variables
    // but at this time, they are not yet evaluated and applied
    // we are resolving them manually so they can take effect in Ignis module resolution
    // note .env variables take precedence over options passed directly from nuxt.config.ts
    // when neither is, Ignis will apply defaults

    // #171 - guard rejecting corrupted .env variables that does not match expected values
    envValidate()

    envApply(ignisOpts)

    if (!ignisOpts) {
      console.debug('No Ignis options provided. Setting defaults.')
      modules['@nuxt-ignis/default'] = { }
      return modules
    }

    if (isDefaultActive(ignisOpts)) {
      modules['@nuxt-ignis/default'] = { }
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

    return modules
  },
  setup(_options, nuxt) {
    console.debug('Nuxt Ignis Features module setup called!')

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: IgnisOptions }
    const ignisOpts = nuxtOpts.ignis || {}

    // ensure proper runtime config type inference for modules that are NOT active
    const ignis = (nuxt.options.runtimeConfig.public.ignis ||= {}) as IgnisOptions
    if (!isDefaultActive(ignisOpts)) {
      ignis.default ||= {
        eslint: false, fonts: false, image: false, scripts: false, security: false, auth: false, vueuse: false, pinia: false, css: false,
      }
    }
    ignis.preset ||= {
      ui: 'off', db: 'off', forms: 'off', validation: 'off',
    }
    if (!isUiActive(ignisOpts)) {
      ignis.ui ||= {
        ui: false, tailwind: false, openprops: false, charts: false,
      }
    }
    if (!isDbActive(ignisOpts)) {
      ignis.db ||= {
        neon: { enabled: false },
        supabase: { enabled: false, types: false },
      }
    }
    if (!isFormsActive(ignisOpts)) {
      ignis.forms ||= {
        formkit: { enabled: false, default: '', config: '' },
        vueform: { enabled: false },
      }
    }
    if (!isValidationActive(ignisOpts)) {
      ignis.validation ||= {
        zod: false, valibot: false,
      }
    }
    if (!isContentActive(ignisOpts)) {
      ignis.content ||= {
        content: { enabled: false },
        i18n: { enabled: false, default: '' },
        seo: { enabled: false },
        social: { enabled: false, url: '' },
        pslo: { enabled: false, content: false },
      }
    }
    if (!isUtilsActive(ignisOpts)) {
      ignis.utils ||= {
        equipment: { enabled: false, composables: '', plugins: '' },
        regexp: { enabled: false },
      }
    }

    // additional processing

    // warn if duplicate modules find
    // this means e.g. 2 database modules or 2 form solutions
    if (ignisOpts.config?.warn?.duplicates) {
      checkForDuplicateModules(ignisOpts)
    }

    // temporary fix for Nuxt 4.4.4 regression
    // see https://github.com/nuxt/nuxt/issues/34957#issuecomment-4355775463
    // TODO remove after patched version Nuxt 4.4.5 is integrated
    if (ignisOpts.config?.nuxt?.ssr === false) {
      nuxt.options.experimental ||= {} as NuxtOptions['experimental']
      nuxt.options.experimental.viteEnvironmentApi = true
    }
  },
})
