import { describe, expect, test } from 'vitest'
import { ignisModuleSetup } from '../src/ignisDefaultSetup'
import type { NuxtIgnisDefaultOptions } from '../src/module'

describe('@nuxt-ignis/default - running module setup', () => {
  test('should mark all default features as enabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisDefaultOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.default).toEqual({
      eslint: true,
      fonts: true,
      image: true,
      scripts: true,
      security: true,
      auth: true,
      vueuse: true,
      pinia: true,
      css: true,
    })
  })

  test('should mark all default features as enabled in runtime config if all enabled', () => {
    const nuxtOptions = {
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
          css: true,
        },
      },
    } as NuxtIgnisDefaultOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.default).toEqual({
      eslint: true,
      fonts: true,
      image: true,
      scripts: true,
      security: true,
      auth: true,
      vueuse: true,
      pinia: true,
      css: true,
    })
  })

  test('should mark all default features as disabled in runtime config if all disabled', () => {
    const nuxtOptions = {
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
          css: false,
        },
      },
    } as NuxtIgnisDefaultOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.default).toEqual({
      eslint: false,
      fonts: false,
      image: false,
      scripts: false,
      security: false,
      auth: false,
      vueuse: false,
      pinia: false,
      css: false,
    })
  })

  test('should augment css options if css is enabled', () => {
    const nuxtOptions = {
      ignis: {
        default: {
          css: true,
        },
      },
    } as NuxtIgnisDefaultOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.css).toEqual(
      expect.arrayContaining([expect.stringContaining('ignis.css')]),
    )
  })

  test('should not augment css options if css is disabled', () => {
    const nuxtOptions = {
      ignis: {
        default: {
          css: false,
        },
      },
    } as NuxtIgnisDefaultOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis.css')]),
    )
  })
})
