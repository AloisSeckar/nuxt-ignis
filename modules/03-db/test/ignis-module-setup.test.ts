import { describe, expect, test, vi } from 'vitest'
import { ignisModuleSetup } from '../src/ignisDBSetup'
import type { NuxtIgnisDBOptions } from '../src/module'
import type { Nuxt } from 'nuxt/schema'

// setup can call nuxt.hook function...
const nuxtMock = { hook: vi.fn() } as unknown as Nuxt

describe('@nuxt-ignis/db - running module setup', () => {
  test('should mark all features as disabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisDBOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.db).toEqual({
      neon: {
        enabled: false,
      },
      supabase: {
        enabled: false,
        types: false,
      },
    })
  })

  test('should mark all features as enabled in runtime config if all enabled', () => {
    const nuxtOptions = {
      ignis: {
        db: {
          neon: {
            enabled: true,
          },
          supabase: {
            enabled: true,
            types: 'supabase',
          },
        },
      },
    } as NuxtIgnisDBOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.db).toEqual({
      neon: {
        enabled: true,
      },
      supabase: {
        enabled: true,
        types: 'supabase',
      },
    })
  })

  test('should mark all features as disabled in runtime config if all disabled', () => {
    const nuxtOptions = {
      ignis: {
        db: {
          neon: {
            enabled: false,
          },
          supabase: {
            enabled: false,
            types: false,
          },
        },
      },
    } as NuxtIgnisDBOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.db).toEqual({
      neon: {
        enabled: false,
      },
      supabase: {
        enabled: false,
        types: false,
      },
    })
  })

  test('should mark neon as enabled if only neon is enabled', () => {
    const nuxtOptions = {
      ignis: {
        db: {
          neon: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisDBOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.db).toEqual({
      neon: {
        enabled: true,
      },
      supabase: {
        enabled: false,
        types: false,
      },
    })
  })

  test('should mark supabase as enabled if only supabase is enabled', () => {
    const nuxtOptions = {
      ignis: {
        db: {
          supabase: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisDBOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.db).toEqual({
      neon: {
        enabled: false,
      },
      supabase: {
        enabled: true,
        types: false,
      },
    })
  })

  test('should set supabase types if provided', () => {
    const nuxtOptions = {
      ignis: {
        db: {
          supabase: {
            enabled: true,
            types: 'supabase',
          },
        },
      },
    } as NuxtIgnisDBOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.db?.supabase?.types).toBe('supabase')
  })

  test('should default supabase types to false if not provided', () => {
    const nuxtOptions = {
      ignis: {
        db: {
          supabase: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisDBOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.db?.supabase?.types).toBe(false)
  })
})
