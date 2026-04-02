import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisCoreSetup'
import type { NuxtIgnisCoreOptions } from '../src/module'

describe('@nuxt-ignis/core - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should add all core modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisCoreOptions)).toEqual({
      '@nuxt/eslint': {},
      '@nuxt/fonts': {},
      '@nuxt/image': {},
      '@nuxt/scripts': {},
      'nuxt-security': {},
      'nuxt-auth-utils': {},
      '@vueuse/nuxt': {},
      '@pinia/nuxt': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/core - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/core - No options were provided, setting defaults')
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

  test('should add all core modules if all enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        core: {
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
    } as NuxtIgnisCoreOptions)).toEqual({
      '@nuxt/eslint': {},
      '@nuxt/fonts': {},
      '@nuxt/image': {},
      '@nuxt/scripts': {},
      'nuxt-security': {},
      'nuxt-auth-utils': {},
      '@vueuse/nuxt': {},
      '@pinia/nuxt': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/core - module dependencies are being resolved')
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
        core: {
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
    } as NuxtIgnisCoreOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/core - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })
})
