import { describe, expect, test, vi } from 'vitest'
import { ignisModuleSetup } from '../src/ignisUISetup'
import type { NuxtIgnisUIOptions } from '../src/module'
import type { Nuxt } from 'nuxt/schema'

// setup can call nuxt.hook function...
const nuxtMock = { hook: vi.fn() } as unknown as Nuxt

describe('@nuxt-ignis/ui - running module setup', () => {
  test('should mark all features as disabled in runtime config by default', () => {
    const nuxtOptions = {} as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.ui).toEqual({
      ui: false,
      tailwind: false,
      openprops: false,
      charts: false,
    })
  })

  test('should mark all features as enabled in runtime config if all enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          ui: true,
          tailwind: true,
          openprops: true,
          charts: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.ui).toEqual({
      ui: true,
      tailwind: true,
      openprops: true,
      charts: true,
    })
  })

  test('should mark all features as disabled in runtime config if all disabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          ui: false,
          tailwind: false,
          openprops: false,
          charts: false,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.runtimeConfig?.public?.ignis?.ui).toEqual({
      ui: false,
      tailwind: false,
      openprops: false,
      charts: false,
    })
  })

  test('should augment css options if Nuxt UI is enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          ui: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include the Nuxt UI CSS file
    expect(nuxtOptions.css).toEqual(
      expect.arrayContaining([expect.stringContaining('ignis-nuxt-ui.css')]),
    )
    // but not the others
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-tailwind.css')]),
    )
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-open-props.css')]),
    )
  })

  test('should not augment css options if Nuxt UI is disabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          ui: false,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-nuxt-ui.css')]),
    )
  })

  test('should augment css options if Tailwind CSS is enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          tailwind: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include the Nuxt UI CSS file
    expect(nuxtOptions.css).toEqual(
      expect.arrayContaining([expect.stringContaining('ignis-tailwind.css')]),
    )
    // but not the others
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-nuxt-ui.css')]),
    )
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-open-props.css')]),
    )
  })

  test('should not augment css options if Tailwind CSS is disabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          tailwind: false,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-tailwind.css')]),
    )
  })

  test('should ignore Tailwind CSS settings if Nuxt UI is also enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          ui: true,
          tailwind: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include the Nuxt UI CSS file
    expect(nuxtOptions.css).toEqual(
      expect.arrayContaining([expect.stringContaining('ignis-nuxt-ui.css')]),
    )
    // but not Tailwind CSS file
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-tailwind.css')]),
    )
  })

  test('should respect Tailwind CSS settings if Nuxt UI is disabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          ui: false,
          tailwind: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include the Tailwind CSS file
    expect(nuxtOptions.css).toEqual(
      expect.arrayContaining([expect.stringContaining('ignis-tailwind.css')]),
    )
    // but not Nuxt UI CSS file
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-nuxt-ui.css')]),
    )
  })

  test('should augment css options if Open Props is enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          openprops: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include the Open Props CSS file
    expect(nuxtOptions.css).toEqual(
      expect.arrayContaining([expect.stringContaining('ignis-open-props.css')]),
    )
    // but not the others
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-nuxt-ui.css')]),
    )
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-tailwind.css')]),
    )
  })

  test('should not augment css options if Open Props is disabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          openprops: false,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    expect(nuxtOptions.css).toEqual(
      expect.not.arrayContaining([expect.stringContaining('ignis-open-props.css')]),
    )
  })

  test('should include Vite plugin if Tailwind CSS is enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          tailwind: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include the Vite plugin for Tailwind CSS
    expect(JSON.stringify(nuxtOptions.vite.plugins)).toContain('@tailwindcss/vite')
  })

  test('should include Tailwind fix if Tailwind CSS is enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          tailwind: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include custom plugin to fix sourcemap warnings
    expect(JSON.stringify(nuxtOptions.vite)).toContain('ignore-tailwind-sourcemap-warnings')
  })

  test('should include Tailwind fix if Nuxt UI is enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          ui: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include custom plugin to fix sourcemap warnings
    expect(JSON.stringify(nuxtOptions.vite)).toContain('ignore-tailwind-sourcemap-warnings')
  })

  test('should include PostCSS plugin if Open Props is enabled', () => {
    const nuxtOptions = {
      ignis: {
        ui: {
          openprops: true,
        },
      },
    } as NuxtIgnisUIOptions
    ignisModuleSetup(nuxtOptions, nuxtMock)
    // should include the PostCSS plugin for Open Props
    expect(JSON.stringify(nuxtOptions.postcss.plugins)).toContain('"postcss-jit-props":')
  })
})
