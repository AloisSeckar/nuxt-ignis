import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisUISetup'
import type { NuxtIgnisUIOptions } from '../src/module'

describe('@nuxt-ignis/ui - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should add no modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisUIOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/ui - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add @nuxt/ui module if Nuxt UI enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        ui: {
          ui: true,
        },
      },
    } as NuxtIgnisUIOptions)).toEqual({
      '@nuxt/ui': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/ui - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/ui module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if Tailwind CSS enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        ui: {
          tailwind: true,
        },
      },
    } as NuxtIgnisUIOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/ui - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add no modules if Open Props enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        ui: {
          openprops: true,
        },
      },
    } as NuxtIgnisUIOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/ui - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add nuxt-charts module if Nuxt Charts enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        ui: {
          charts: true,
        },
      },
    } as NuxtIgnisUIOptions)).toEqual({
      'nuxt-charts': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/ui - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('nuxt-charts module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })
})
