import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisCoreOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  eslint?: boolean
  fonts?: boolean
  image?: boolean
  scripts?: boolean
  security?: boolean
  vueuse?: boolean
  pinia?: boolean
  auth?: boolean
}

export default defineNuxtModule<IgnisCoreOptions>({
  meta: {
    name: '@nuxt-ignis/core',
    configKey: 'ignisCore',
  },
  defaults: {
    eslint: true,
    fonts: true,
    image: true,
    scripts: true,
    security: true,
    auth: true,
    vueuse: true,
    pinia: true,
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/core - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtoptions = nuxt.options as NuxtOptions & { ignis?: { core?: IgnisCoreOptions } }
    let options = nuxtoptions.ignisCore || nuxtoptions.ignis?.core
    if (!options) {
      console.debug('@nuxt-ignis/core - No options provided, setting defaults')
      options = {
        eslint: true,
        fonts: true,
        image: true,
        scripts: true,
        security: true,
        auth: true,
        vueuse: true,
        pinia: true,
      }
    }

    if (options?.eslint !== false) {
      // https://nuxt.com/modules/eslint
      modules['@nuxt/eslint'] = { }
      console.debug('@nuxt/eslint module installed')
    }

    // https://nuxt.com/modules/fonts
    if (options?.fonts !== false) {
      modules['@nuxt/fonts'] = { }
      console.debug('@nuxt/fonts module installed')
    }

    // https://image.nuxt.com/
    if (options?.image !== false) {
      modules['@nuxt/image'] = { }
      console.debug('@nuxt/image module installed')
    }

    // https://scripts.nuxt.com/
    if (options?.scripts !== false) {
      modules['@nuxt/scripts'] = { }
      console.debug('@nuxt/scripts module installed')
    }

    // https://nuxt.com/modules/security
    if (options?.security !== false) {
      modules['nuxt-security'] = { }
      console.debug('nuxt-security module installed')
    }

    // https://github.com/atinux/nuxt-auth-utils
    if (options?.auth === true) {
      modules['nuxt-auth-utils'] = { }
      console.debug('nuxt-auth-utils module installed')
    }

    // https://nuxt.com/modules/vueuse
    if (options?.vueuse !== false) {
      modules['@vueuse/nuxt'] = { }
      console.debug('@vueuse/nuxt module installed')
    }

    // https://pinia.vuejs.org/ssr/nuxt.html
    if (options?.pinia !== false) {
      modules['@pinia/nuxt'] = { }
      console.debug('@pinia/nuxt module installed')
    }

    return modules
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.ignis ||= {
      core: {
        eslint: options?.eslint || true,
        fonts: options?.fonts || true,
        image: options?.image || true,
        scripts: options?.scripts || true,
        security: options?.security || true,
        auth: options?.auth || false,
        vueuse: options?.vueuse || true,
        pinia: options?.pinia || true,
      },
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
