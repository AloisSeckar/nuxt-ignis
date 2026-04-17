import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { join } from 'node:path'
import { ignisModuleSetup } from '../src/ignisFormsSetup'
import type { NuxtIgnisFormsOptions } from '../src/module'

import { existsSync } from 'node:fs'
import { addTemplate } from '@nuxt/kit'

vi.mock('node:fs', () => ({
  existsSync: vi.fn(() => false),
}))

vi.mock('@nuxt/kit', () => ({
  addTemplate: vi.fn(),
}))

const MOCK_RUNTIME_DIR = '/mock/runtime'

describe('@nuxt-ignis/forms - running module setup', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    vi.mocked(existsSync).mockReset().mockReturnValue(false)
    vi.mocked(addTemplate).mockClear()
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should mark all features as disabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
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
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
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
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
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
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
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
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
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
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
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
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
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
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
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
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
      ignis: {
        forms: {
          formkit: {
            enabled: true,
            default: 'de',
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.default).toBe('de')
  })

  test('should set default formkit locale to en if not provided', () => {
    const nuxtOptions = {
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.default).toBe('en')
  })

  test('should set formkit config path if provided', () => {
    const nuxtOptions = {
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
      ignis: {
        forms: {
          formkit: {
            enabled: true,
            config: './custom-formkit.config.ts',
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.config).toBe('./custom-formkit.config.ts')
  })

  test('should set default formkit config path if not provided', () => {
    const nuxtOptions = {
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.forms?.formkit?.config).toBe('./formkit.config.ts')
  })

  test('should generate formkit.config.ts template when formkit enabled without custom config', () => {
    const nuxtOptions = {
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(addTemplate).toHaveBeenCalledWith(
      expect.objectContaining({
        filename: 'formkit.config.ts',
        write: true,
      }),
    )
    // verify template content
    const call = vi.mocked(addTemplate).mock.calls.find(
      c => (c[0] as { filename: string }).filename === 'formkit.config.ts',
    )
    const getContents = (call![0] as { getContents: () => string }).getContents
    expect(getContents()).toContain('loadFormkitConfig')
    expect(nuxtOptions.alias?.['#ignis-forms/formkit-config']).toBeDefined()
  })

  test('should not generate formkit.config.ts template when custom config is provided', () => {
    const nuxtOptions = {
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
      ignis: {
        forms: {
          formkit: {
            enabled: true,
            config: './custom-formkit.config.ts',
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(addTemplate).not.toHaveBeenCalled()
    // alias should still be registered
    expect(nuxtOptions.alias?.['#ignis-forms/formkit-config']).toBeDefined()
  })

  test('should not generate templates when forms are disabled', () => {
    const nuxtOptions = {
      ignis: {
        forms: {
          formkit: {
            enabled: false,
          },
          vueform: {
            enabled: false,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(addTemplate).not.toHaveBeenCalled()
  })

  test('should not generate formkit.config.ts template when user config exists in root', () => {
    vi.mocked(existsSync).mockImplementation((p) => {
      return String(p) === join('/mock/project', 'formkit.config.ts')
    })
    const nuxtOptions = {
      rootDir: '/mock/project',
      buildDir: '/mock/project/.nuxt',
      ignis: {
        forms: {
          formkit: {
            enabled: true,
          },
        },
      },
    } as NuxtIgnisFormsOptions
    ignisModuleSetup(nuxtOptions, MOCK_RUNTIME_DIR)
    expect(addTemplate).not.toHaveBeenCalled()
    expect(nuxtOptions.alias?.['#ignis-forms/formkit-config']).toBeDefined()
  })
})
