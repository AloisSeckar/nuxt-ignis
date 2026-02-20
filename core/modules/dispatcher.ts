import { defineNuxtModule } from 'nuxt/kit'
import type { IgnisCoreOptions } from '@nuxt-ignis/core'

export interface IgnisOptions {
  // @nuxt-ignis/core module
  core: IgnisCoreOptions
  // @nuxt-ignis/ui module
  ui: {
    // activation flag
    enabled: boolean
  }
  // @nuxt-ignis/db module
  db: {
    // activation flag
    enabled: boolean
  }
  // @nuxt-ignis/forms module
  forms: {
    // activation flag
    enabled: boolean
  }
  // @nuxt-ignis/validation module
  validation: {
    // activation flag
    enabled: boolean
  }
  // @nuxt-ignis/content module
  content: {
    // activation flag
    enabled: boolean
  }
  // @nuxt-ignis/utils module
  utils: {
    // activation flag
    enabled: boolean
  }
}

export default defineNuxtModule<IgnisOptions>({
  meta: {
    name: 'ignis/dispatcher',
    configKey: 'ignis',
  },
  moduleDependencies(nuxt) {
    console.warn('Nuxt Ignis Dispatcher - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const opts = nuxt.options.ignis
    console.warn(opts)
    if (!opts) {
      modules['@nuxt-ignis/core'] = { }
      return modules
    }

    if (opts?.core?.enabled !== false) {
      modules['@nuxt-ignis/core'] = {
        defaults: opts.core || {},
      }
    }

    if (opts?.ui?.enabled === true) {
      modules['@nuxt-ignis/ui'] = {
        defaults: opts.ui || {},
      }
    }
    if (opts?.db?.enabled === true) {
      modules['@nuxt-ignis/db'] = {
        defaults: opts.db || {},
      }
    }

    if (opts?.forms?.enabled === true) {
      modules['@nuxt-ignis/forms'] = {
        defaults: opts.forms || {},
      }
    }

    if (opts?.validation?.enabled === true) {
      modules['@nuxt-ignis/validation'] = {
        defaults: opts.validation || {},
      }
    }

    if (opts?.content?.enabled === true) {
      modules['@nuxt-ignis/content'] = {
        defaults: opts.content || {},
      }
    }

    if (opts?.utils?.enabled === true) {
      modules['@nuxt-ignis/utils'] = {
        defaults: opts.utils || {},
      }
    }

    return modules
  },
  setup() {
    console.warn('Nuxt Ignis Dispatcher module setup called!')
  },
})
