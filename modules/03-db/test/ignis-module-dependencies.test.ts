import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisDBSetup'
import type { NuxtIgnisDBOptions } from '../src/module'

describe('@nuxt-ignis/db - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should add no modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisDBOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/db - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add nuxt-neon module if Neon enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        db: {
          neon: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisDBOptions)).toEqual({
      'nuxt-neon': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/db - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('nuxt-neon module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if Neon disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        db: {
          neon: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisDBOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/db - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add @nuxtjs/supabase module if Supabase enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        db: {
          supabase: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisDBOptions)).toEqual({
      '@nuxtjs/supabase': {
        defaults: {
          redirect: false,
          types: false,
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/db - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/supabase module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add @nuxtjs/supabase module with types if Supabase enabled with types', () => {
    expect(ignisModuleDependencies({
      ignis: {
        db: {
          supabase: {
            enabled: true,
            types: 'supabase',
          },
        },
      },
    } as NuxtIgnisDBOptions)).toEqual({
      '@nuxtjs/supabase': {
        defaults: {
          redirect: false,
          types: 'supabase',
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/db - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/supabase module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if Supabase disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        db: {
          supabase: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisDBOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/db - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })
})
