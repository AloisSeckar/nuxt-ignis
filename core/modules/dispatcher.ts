import { defineNuxtModule } from 'nuxt/kit'
import type { IgnisCoreOptions } from '@nuxt-ignis/core'
import type { IgnisUIOptions } from '@nuxt-ignis/ui'
import type { IgnisDBOptions } from '@nuxt-ignis/db'
import type { IgnisFormsOptions } from '@nuxt-ignis/forms'
import type { IgnisValidationOptions } from '@nuxt-ignis/validation'
import type { IgnisContentOptions } from '@nuxt-ignis/content'
import type { IgnisUtilsOptions } from '@nuxt-ignis/utils'

export interface IgnisOptions {
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

    const opts = nuxt.options.ignis
    console.debug('Received options:', opts)

    if (!opts) {
      console.debug('Setting default options')
      modules['@nuxt-ignis/core'] = { }
      return modules
    }

    if (opts?.core?.active !== false) {
      modules['@nuxt-ignis/core'] = {
        defaults: opts.core || {},
      }
    }

    if (opts?.ui?.active === true) {
      modules['@nuxt-ignis/ui'] = {
        defaults: opts.ui || {},
      }
    }
    if (opts?.db?.active === true) {
      modules['@nuxt-ignis/db'] = {
        defaults: opts.db || {},
      }
    }

    if (opts?.forms?.active === true) {
      modules['@nuxt-ignis/forms'] = {
        defaults: opts.forms || {},
      }
    }

    if (opts?.validation?.active === true) {
      modules['@nuxt-ignis/validation'] = {
        defaults: opts.validation || {},
      }
    }

    if (opts?.content?.active === true) {
      modules['@nuxt-ignis/content'] = {
        defaults: opts.content || {},
      }
    }

    if (opts?.utils?.active === true) {
      modules['@nuxt-ignis/utils'] = {
        defaults: opts.utils || {},
      }
    }

    return modules
  },
  setup() {
    console.debug('Nuxt Ignis Dispatcher module setup called!')
  },
})
