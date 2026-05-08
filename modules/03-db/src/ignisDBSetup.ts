import type { Nuxt, PublicRuntimeConfig, RuntimeConfig } from 'nuxt/schema'
import type { IgnisDBOptions, NuxtIgnisDBOptions } from './module'

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisDBOptions) {
  console.debug('@nuxt-ignis/db - module dependencies are being resolved')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  const options = nuxtOptions.ignis?.db

  if (options?.neon?.enabled === true) {
    modules['nuxt-neon'] = { }
    console.debug('nuxt-neon module installed')
  }

  if (options?.supabase?.enabled === true) {
    modules['@nuxtjs/supabase'] = {
      defaults: {
        redirect: false, // https://github.com/supabase/supabase/issues/16551#issuecomment-1685300935
        types: options.supabase?.types || false as const,
      },
    }
    console.debug('@nuxtjs/supabase module installed')
  }

  return modules
}

export function ignisModuleSetup(nuxtOptions: NuxtIgnisDBOptions, nuxt: Nuxt) {
  console.debug('@nuxt-ignis/db - module setup function runs')

  const options = nuxtOptions.ignis?.db

  // inject runtime config values
  nuxtOptions.runtimeConfig ||= {
    public: {} as PublicRuntimeConfig,
  } as RuntimeConfig

  const runtimeConfig = nuxtOptions.runtimeConfig.public as { ignis?: { db?: IgnisDBOptions } }
  runtimeConfig.ignis ??= {}
  runtimeConfig.ignis.db ??= {}
  runtimeConfig.ignis.db.neon ??= {}
  runtimeConfig.ignis.db.neon.enabled ??= options?.neon?.enabled ?? false
  runtimeConfig.ignis.db.supabase ??= {}
  runtimeConfig.ignis.db.supabase.enabled ??= options?.supabase?.enabled ?? false
  runtimeConfig.ignis.db.supabase.types ??= options?.supabase?.types ?? false

  // additional processing

  // fix for nuxt-neon integration - increase default limit of Node.js event listeners
  // to prevent possible MaxListenersExceededWarning in dev mode
  if (options?.neon?.enabled) {
    nuxt.hook('vite:serverCreated', (viteServer) => {
      viteServer.middlewares.use((_req, res, next) => {
        res.setMaxListeners(20)
        next()
      })
    })
  }
}
