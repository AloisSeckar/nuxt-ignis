import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleSetup } from '../src/ignisFormsSetup'
import type { NuxtIgnisFormsOptions } from '../src/module'

import { existsSync } from 'node:fs'

vi.mock('node:fs', () => ({
  existsSync: vi.fn(() => false),
}))

describe('@nuxt-ignis/forms - running module setup', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    vi.mocked(existsSync).mockReset().mockReturnValue(false)
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should mark all features as disabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms).toEqual({
      formkit: {
        enabled: false,
        default: 'en',
        config: './formkit.config.ts',
      },
      vueform: {
        enabled: false,
      },
    })
  })

  test('should mark all features as enabled in runtime config if all enabled', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: true,
            default: 'de',
            config: './custom-formkit.config.ts',
          },
          vueform: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms).toEqual({
      formkit: {
        enabled: true,
        default: 'de',
        config: './custom-formkit.config.ts',
      },
      vueform: {
        enabled: true,
      },
    })
  })

  test('should mark all features as disabled in runtime config if all disabled', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: false,
            default: 'en',
            config: './formkit.config.ts',
          },
          vueform: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms).toEqual({
      formkit: {
        enabled: false,
        default: 'en',
        config: './formkit.config.ts',
      },
      vueform: {
        enabled: false,
      },
    })
  })

  test('should mark formkit as enabled if only formkit is enabled', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
          vueform: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms).toEqual({
      formkit: {
        enabled: true,
        default: 'en',
        config: './formkit.config.ts',
      },
      vueform: {
        enabled: false,
      },
    })
  })

  test('should mark vueform as enabled if only vueform is enabled', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: false,
          },
          vueform: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms).toEqual({
      formkit: {
        enabled: false,
        default: 'en',
        config: './formkit.config.ts',
      },
      vueform: {
        enabled: true,
      },
    })
  })

  test('should set formkit default locale if provided', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: true,
            default: 'de',
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.default).toBe('de')
  })

  test('should set default formkit locale to en if not provided', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.default).toBe('en')
  })

  test('should set formkit config path if provided', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: true,
            config: './custom-formkit.config.ts',
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.config).toBe('./custom-formkit.config.ts')
  })

  test('should set default formkit config path if not provided', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.config).toBe('./formkit.config.ts')
  })
})
