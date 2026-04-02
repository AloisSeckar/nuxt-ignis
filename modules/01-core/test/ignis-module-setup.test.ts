import { describe, expect, test } from 'vitest'
import { ignisModuleSetup } from '../src/ignisCoreSetup'
import type { NuxtIgnisCoreOptions } from '../src/module'

describe('@nuxt-ignis/core - running module setup', () => {
  test('should mark all core features as enabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisCoreOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.core).toEqual({
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

  test('should mark all core features as enabled in runtime config if all enabled', () => {
    const nuxtOptions = {
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
          css: true,
        },
      },
    } as NuxtIgnisCoreOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.core).toEqual({
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

  test('should mark all core features as disabled in runtime config if all disabled', () => {
    const nuxtOptions = {
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
          css: false,
        },
      },
    } as NuxtIgnisCoreOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.core).toEqual({
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
        core: {
          css: true,
        },
      },
    } as NuxtIgnisCoreOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.css).toEqual(
      expect.arrayContaining([expect.stringContaining('ignis.css')]),
    )
  })

  test('should not augment css options if css is disabled', () => {
    const nuxtOptions = {
      ignis: {
        core: {
          css: false,
        },
      },
    } as NuxtIgnisCoreOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis.css')]),
    )
  })
})
