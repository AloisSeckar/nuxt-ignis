import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleSetup } from '../src/ignisValidationSetup'
import type { NuxtIgnisValidationOptions } from '../src/module'

vi.mock('@nuxt/kit', () => ({
  createResolver: () => ({
    resolve: (path: string) => path,
  }),
  addImports: vi.fn(),
}))

describe('@nuxt-ignis/validation - running module setup', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should mark all features as disabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisValidationOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.validation).toEqual({
      zod: false,
      valibot: false,
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - module setup function runs')
    expect(debugSpy).toHaveBeenCalledTimes(1)
  })

  test('should mark all features as enabled in runtime config if all enabled', () => {
    const nuxtOptions = {
      ignis: {
        validation: {
          zod: true,
          valibot: true,
        },
      } } as NuxtIgnisValidationOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.validation).toEqual({
      zod: true,
      valibot: true,
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - module setup function runs')
    expect(debugSpy).toHaveBeenCalledWith('zod validation enabled')
    expect(debugSpy).toHaveBeenCalledWith('valibot validation enabled')
    expect(debugSpy).toHaveBeenCalledTimes(3)
  })

  test('should mark zod as enabled if only zod is enabled', () => {
    const nuxtOptions = {
      ignis: {
        validation: {
          zod: true,
          valibot: false,
        },
      },
    } as NuxtIgnisValidationOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.validation).toEqual({
      zod: true,
      valibot: false,
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - module setup function runs')
    expect(debugSpy).toHaveBeenCalledWith('zod validation enabled')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should mark valibot as enabled if only valibot is enabled', () => {
    const nuxtOptions = {
      ignis: {
        validation: {
          zod: false,
          valibot: true,
        },
      },
    } as NuxtIgnisValidationOptions
    ignisModuleSetup(nuxtOptions)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.validation).toEqual({
      zod: false,
      valibot: true,
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - module setup function runs')
    expect(debugSpy).toHaveBeenCalledWith('valibot validation enabled')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })
})
