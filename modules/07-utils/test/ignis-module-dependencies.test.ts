import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisUtilsSetup'
import type { NuxtIgnisUtilsOptions } from '../src/module'

describe('@nuxt-ignis/utils - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should add no modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisUtilsOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/utils - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add @maas/vue-equipment/nuxt module if Equipment enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        utils: {
          equipment: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisUtilsOptions)).toEqual({
      '@maas/vue-equipment/nuxt': {
        defaults: {},
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/utils - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@maas/vue-equipment/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add @maas/vue-equipment/nuxt module with custom config', () => {
    expect(ignisModuleDependencies({
      ignis: {
        utils: {
          equipment: {
            enabled: true,
            plugins: 'myPlugin',
            composables: 'useComposable',
          },
        },
      },
    } as NuxtIgnisUtilsOptions)).toEqual({
      '@maas/vue-equipment/nuxt': {
        defaults: {
          composables: ['useComposable'],
          plugins: ['myPlugin'],
        },
      },
    })
  })

  test('should add @maas/vue-equipment/nuxt module and handle comma-separated values', () => {
    expect(ignisModuleDependencies({
      ignis: {
        utils: {
          equipment: {
            enabled: true,
            plugins: 'myFirstPlugin, mySecondPlugin',
            composables: ' useFirstComposable, useSecondComposable ',
          },
        },
      },
    } as NuxtIgnisUtilsOptions)).toEqual({
      '@maas/vue-equipment/nuxt': {
        defaults: {
          composables: ['useFirstComposable', 'useSecondComposable'],
          plugins: ['myFirstPlugin', 'mySecondPlugin'],
        },
      },
    })
  })

  test('should add no modules if Equipment disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        utils: {
          equipment: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisUtilsOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/utils - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add magic-regexp/nuxt module if RegExp enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        utils: {
          regexp: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisUtilsOptions)).toEqual({
      'magic-regexp/nuxt': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/utils - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('magic-regexp/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if RegExp disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        utils: {
          regexp: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisUtilsOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/utils - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add both modules if both Equipment and RegExp enabled', () => {
    expect(ignisModuleDependencies({
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
    } as NuxtIgnisUtilsOptions)).toEqual({
      '@maas/vue-equipment/nuxt': {
        defaults: {},
      },
      'magic-regexp/nuxt': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/utils - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@maas/vue-equipment/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledWith('magic-regexp/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(3)
  })
})
