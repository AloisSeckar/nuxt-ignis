import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleSetup } from '../src/ignisContentSetup'
import type { NuxtIgnisContentOptions } from '../src/module'

import { readdirSync } from 'node:fs'
import { addTemplate } from '@nuxt/kit'

vi.mock('node:fs', () => ({
  readdirSync: vi.fn(),
}))

vi.mock('@nuxt/kit', () => ({
  addTemplate: vi.fn(() => ({ dst: '/mock/.nuxt/ignis-i18n-locales.mjs' })),
}))

vi.mock('consola', () => {
  const warn = vi.fn()
  const debug = vi.fn()
  return {
    createConsola: () => ({ warn, debug }),
  }
})

describe('@nuxt-ignis/content - running module setup', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.mocked(readdirSync).mockReset()
    vi.mocked(addTemplate).mockClear()
  })

  afterEach(() => {
    debugSpy.mockRestore()
    warnSpy.mockRestore()
  })

  test('should mark all features as disabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.content).toEqual({
      content: { enabled: false },
      i18n: { enabled: false, default: 'en' },
      seo: { enabled: false },
      social: { enabled: false, url: '' },
      pslo: { enabled: false, content: false },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module setup function runs')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should mark all features as enabled in runtime config if all enabled', () => {
    vi.mocked(readdirSync).mockReturnValue(['en.json', 'de.json'] as unknown as ReturnType<typeof readdirSync>)

    const nuxtOptions = {
      rootDir: '/app',
      buildDir: '/app/.nuxt',
      ignis: {
        content: {
          content: { enabled: true },
          i18n: { enabled: true, default: 'de' },
          seo: { enabled: true },
          social: { enabled: true, url: 'https://example.com' },
          pslo: { enabled: true, content: true },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.content).toEqual({
      content: { enabled: true },
      i18n: { enabled: true, default: 'de' },
      seo: { enabled: true },
      social: { enabled: true, url: 'https://example.com' },
      pslo: { enabled: true, content: true },
    })
  })

  test('should mark all features as disabled in runtime config if all disabled', () => {
    const nuxtOptions = {
      ignis: {
        content: {
          content: { enabled: false },
          i18n: { enabled: false },
          seo: { enabled: false },
          social: { enabled: false },
          pslo: { enabled: false },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.content).toEqual({
      content: { enabled: false },
      i18n: { enabled: false, default: 'en' },
      seo: { enabled: false },
      social: { enabled: false, url: '' },
      pslo: { enabled: false, content: false },
    })
  })

  test('should auto-discover locale files when i18n is enabled', () => {
    vi.mocked(readdirSync).mockReturnValue(['en.json', 'de.json'] as unknown as ReturnType<typeof readdirSync>)

    const nuxtOptions = {
      rootDir: '/app',
      buildDir: '/app/.nuxt',
      ignis: {
        content: {
          i18n: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)

    expect(readdirSync).toHaveBeenCalled()
    expect(addTemplate).toHaveBeenCalled()
    expect(nuxtOptions.alias?.['#ignis-i18n-locales']).toBe('/mock/.nuxt/ignis-i18n-locales.mjs')

    expect(debugSpy).toHaveBeenCalledWith('i18n enabled with default locale: en, undefined')
    expect(debugSpy).toHaveBeenCalledWith('i18n locale files found: en, de')
  })

  test('should warn when no i18n locale files found', () => {
    vi.mocked(readdirSync).mockImplementation(() => {
      throw new Error('ENOENT')
    })

    const nuxtOptions = {
      rootDir: '/app',
      buildDir: '/app/.nuxt',
      ignis: {
        content: {
          i18n: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('No i18n locale files found'))
    expect(debugSpy).toHaveBeenCalledWith('i18n locale files found: none')
  })

  test('should default i18n locale to en if not provided', () => {
    vi.mocked(readdirSync).mockReturnValue([] as unknown as ReturnType<typeof readdirSync>)

    const nuxtOptions = {
      rootDir: '/app',
      buildDir: '/app/.nuxt',
      ignis: {
        content: {
          i18n: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.content?.i18n?.default).toBe('en')
  })

  test('should enable pslo and log debug when pslo is enabled', () => {
    const nuxtOptions = {
      ignis: {
        content: {
          pslo: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)

    expect(debugSpy).toHaveBeenCalledWith('elrh-pslo enabled')
  })

  test('should warn when social share is enabled but no baseUrl is set', () => {
    const nuxtOptions = {
      ignis: {
        content: {
          social: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Base URL for `nuxt-social-share` is not set'))
  })

  test('should not warn about social share baseUrl when url is provided', () => {
    const nuxtOptions = {
      ignis: {
        content: {
          social: { enabled: true, url: 'https://example.com' },
        },
      },
    } as NuxtIgnisContentOptions
    ignisModuleSetup(nuxtOptions)

    expect(warnSpy).not.toHaveBeenCalledWith(expect.stringContaining('Base URL for `nuxt-social-share` is not set'))
  })
})
