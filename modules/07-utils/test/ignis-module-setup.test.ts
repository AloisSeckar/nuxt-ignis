import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleSetup } from '../src/ignisUtilsSetup'
import type { NuxtIgnisUtilsOptions } from '../src/module'

describe('@nuxt-ignis/utils - running module setup', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should mark all features as disabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisUtilsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.utils).toEqual({
      equipment: {
        enabled: false,
        composables: '',
        plugins: '',
      },
      regexp: {
        enabled: false,
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/utils - module setup function runs')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should mark all features as enabled in runtime config if all enabled', () => {
    const nuxtOptions = {
      runtimeConfig: { public: {} },
      ignis: {
        utils: {
          equipment: {
            enabled: true,
          },
          regexp: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisUtilsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.utils).toEqual({
      equipment: {
        enabled: true,
        composables: '',
        plugins: '',
      },
      regexp: {
        enabled: true,
      },
    })
  })

  test('should mark all features as disabled in runtime config if all disabled', () => {
    const nuxtOptions = {
      runtimeConfig: { public: {} },
      ignis: {
        utils: {
          equipment: {
            enabled: false,
          },
          regexp: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisUtilsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.utils).toEqual({
      equipment: {
        enabled: false,
        composables: '',
        plugins: '',
      },
      regexp: {
        enabled: false,
      },
    })
  })

  test('should mark equipment as enabled if only equipment is enabled', () => {
    const nuxtOptions = {
      runtimeConfig: { public: {} },
      ignis: {
        utils: {
          equipment: {
            enabled: true,
          },
          regexp: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisUtilsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.utils).toEqual({
      equipment: {
        enabled: true,
        composables: '',
        plugins: '',
      },
      regexp: {
        enabled: false,
      },
    })
  })

  test('should mark regexp as enabled if only regexp is enabled', () => {
    const nuxtOptions = {
      runtimeConfig: { public: {} },
      ignis: {
        utils: {
          equipment: {
            enabled: false,
          },
          regexp: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisUtilsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.utils).toEqual({
      equipment: {
        enabled: false,
        composables: '',
        plugins: '',
      },
      regexp: {
        enabled: true,
      },
    })
  })

  test('should set equipment config if provided', () => {
    const nuxtOptions = {
      runtimeConfig: { public: {} },
      ignis: {
        utils: {
          equipment: {
            enabled: true,
            composables: 'useComposable',
            plugins: 'myPlugin',
          },
        },
      },
    } as NuxtIgnisUtilsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig.public.ignis.utils.equipment?.composables).toBe('useComposable')
    expect(nuxtOptions.runtimeConfig.public.ignis.utils.equipment?.plugins).toBe('myPlugin')
  })
})
