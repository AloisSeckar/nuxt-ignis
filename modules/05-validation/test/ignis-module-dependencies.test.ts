import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisValidationSetup'
import type { NuxtIgnisValidationOptions } from '../src/module'

vi.mock('@nuxt/kit', () => ({
  createResolver: () => ({
    resolve: (path: string) => path,
  }),
  addImports: vi.fn(),
}))

describe('@nuxt-ignis/validation - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    debugSpy.mockRestore()
  })

  test('should add no modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisValidationOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - no modules to be activated')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if zod and valibot enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        validation: {
          zod: true,
          valibot: true,
        },
      },
    } as NuxtIgnisValidationOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - no modules to be activated')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })

  test('should add no modules if zod and valibot disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        validation: {
          zod: false,
          valibot: false,
        },
      },
    } as NuxtIgnisValidationOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/validation - no modules to be activated')
    expect(debugSpy).toHaveBeenCalledTimes(2)
  })
})
