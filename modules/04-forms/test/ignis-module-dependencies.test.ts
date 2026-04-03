import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisFormsSetup'
import type { NuxtIgnisFormsOptions } from '../src/module'

describe('@nuxt-ignis/forms - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should add no modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisFormsOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/forms - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add @vueform/nuxt module if Vueform enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        forms: {
          vueform: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions)).toEqual({
      '@vueform/nuxt': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/forms - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@vueform/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if Vueform disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        forms: {
          vueform: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisFormsOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/forms - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add @formkit/nuxt module if FormKit enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions)).toEqual({
      '@formkit/nuxt': {
        defaults: {
          autoImport: true,
          default: 'en',
          configFile: './formkit.config.ts',
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/forms - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@formkit/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add @formkit/nuxt module with custom config if FormKit enabled with options', () => {
    expect(ignisModuleDependencies({
      ignis: {
        forms: {
          formkit: {
            enabled: true,
            default: 'de',
            config: './custom-formkit.config.ts',
          },
        },
      },
    } as NuxtIgnisFormsOptions)).toEqual({
      '@formkit/nuxt': {
        defaults: {
          autoImport: true,
          default: 'de',
          configFile: './custom-formkit.config.ts',
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/forms - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@formkit/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if FormKit disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        forms: {
          formkit: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisFormsOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/forms - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should add both modules if both Vueform and FormKit enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        forms: {
          vueform: {
            enabled: true,
          },
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions)).toEqual({
      '@vueform/nuxt': {},
      '@formkit/nuxt': {
        defaults: {
          autoImport: true,
          default: 'en',
          configFile: './formkit.config.ts',
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/forms - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@vueform/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledWith('@formkit/nuxt module installed')
    expect(debugSpy).toHaveBeenCalledTimes(3)
  })
})
