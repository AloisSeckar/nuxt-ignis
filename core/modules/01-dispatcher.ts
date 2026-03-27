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
      modules['@nuxt-ignis/core'] = {
        defaults: ignisOpts.core || {},
      }
    }

    if (ignisOpts?.ui?.active === true) {
      modules['@nuxt-ignis/ui'] = {
        defaults: ignisOpts.ui || {},
      }
    }
    if (ignisOpts?.db?.active === true) {
      modules['@nuxt-ignis/db'] = {
        defaults: ignisOpts.db || {},
      }
    }

    if (ignisOpts?.forms?.active === true) {
      modules['@nuxt-ignis/forms'] = {
        defaults: ignisOpts.forms || {},
      }
    }

    if (ignisOpts?.validation?.active === true) {
      modules['@nuxt-ignis/validation'] = {
        defaults: ignisOpts.validation || {},
      }
    }

    if (ignisOpts?.content?.active === true) {
      modules['@nuxt-ignis/content'] = {
        defaults: ignisOpts.content || {},
      }
    }

    if (ignisOpts?.utils?.active === true) {
      modules['@nuxt-ignis/utils'] = {
        defaults: ignisOpts.utils || {},
      }
    }

    return modules
  },
  setup() {
    console.debug('Nuxt Ignis Dispatcher module setup called!')
  },
})
