import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisDefaultSetup'
import type { NuxtIgnisDefaultOptions } from '../src/module'

describe('@nuxt-ignis/default - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should add all default modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisDefaultOptions)).toEqual({
      '@nuxt/eslint': {},
      '@nuxt/fonts': {},
      '@nuxt/image': {},
      '@nuxt/scripts': {},
      'nuxt-security': {},
      'nuxt-auth-utils': {},
      '@vueuse/nuxt': {},
      '@pinia/nuxt': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/default - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/default - No options were provided, setting defaults')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/eslint module installed')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/fonts module installed')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/image module installed')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/scripts module installed')
    expect(debugSpy).toHaveBeenCalledWith('nuxt-security module installed')
    expect(debugSpy).toHaveBeenCalledWith('nuxt-auth-utils module installed')
    expect(debugSpy).toHaveBeenCalledWith('@vueuse/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledWith('@pinia/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(10)
  })

  test('should add all default modules if all enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        default: {
          eslint: true,
          fonts: true,
          image: true,
          scripts: true,
          security: true,
          auth: true,
          vueuse: true,
          pinia: true,
        },
      },
    } as NuxtIgnisDefaultOptions)).toEqual({
      '@nuxt/eslint': {},
      '@nuxt/fonts': {},
      '@nuxt/image': {},
      '@nuxt/scripts': {},
      'nuxt-security': {},
      'nuxt-auth-utils': {},
      '@vueuse/nuxt': {},
      '@pinia/nuxt': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/default - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/eslint module installed')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/fonts module installed')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/image module installed')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/scripts module installed')
    expect(debugSpy).toHaveBeenCalledWith('nuxt-security module installed')
    expect(debugSpy).toHaveBeenCalledWith('nuxt-auth-utils module installed')
    expect(debugSpy).toHaveBeenCalledWith('@vueuse/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledWith('@pinia/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(9)
  })

  test('should add no modules if all disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        default: {
          eslint: false,
          fonts: false,
          image: false,
          scripts: false,
          security: false,
          auth: false,
          vueuse: false,
          pinia: false,
        },
      },
    } as NuxtIgnisDefaultOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/default - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })
})
