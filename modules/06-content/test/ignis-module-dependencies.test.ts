import { readdirSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { ignisModuleDependencies } from '../src/ignisContentSetup'
import type { NuxtIgnisContentOptions } from '../src/module'

vi.mock('node:fs', () => ({
  readdirSync: vi.fn(),
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
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

describe('@nuxt-ignis/content - resolving module dependencies', () => {
  let debugSpy: ReturnType<typeof vi.spyOn>
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.mocked(readdirSync).mockReset()
    // prevent auto-generation of NUXT_OG_IMAGE_SECRET in unrelated tests
    process.env.NUXT_OG_IMAGE_SECRET = 'test-secret'
  })

  afterEach(() => {
    debugSpy.mockRestore()
    warnSpy.mockRestore()
    delete process.env.NUXT_OG_IMAGE_SECRET
  })

  test('should add no modules by default', () => {
    expect(ignisModuleDependencies({} as NuxtIgnisContentOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add @nuxtjs/i18n module if i18n enabled and warn about missing locale files', () => {
    expect(ignisModuleDependencies({
      rootDir: '/app', // required for locale scanning
      ignis: {
        content: {
          i18n: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@nuxtjs/i18n': {
        defaults: {
          defaultLocale: 'en',
          locales: [], // no locale files mocked in this test
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/i18n module installed with locales: none')
    expect(debugSpy).toHaveBeenCalledTimes(2)

    // should warn about missing locale files
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('No i18n locale files found'))
    expect(warnSpy).toHaveBeenCalledTimes(1)
  })

  test('should add @nuxtjs/i18n module if i18n enabled and auto-discover locale files', () => {
    vi.mocked(readdirSync).mockReturnValue(['en.json', 'de.json'] as unknown as ReturnType<typeof readdirSync>)

    expect(ignisModuleDependencies({
      rootDir: '/app',
      ignis: {
        content: {
          i18n: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@nuxtjs/i18n': {
        defaults: {
          locales: [
            { code: 'en', file: 'en.json' },
            { code: 'de', file: 'de.json' },
          ],
          defaultLocale: 'en',
        },
      },
    })

    expect(readdirSync).toHaveBeenCalled()

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/i18n module installed with locales: en, de')
    expect(debugSpy).toHaveBeenCalledTimes(2)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add @nuxtjs/i18n module with custom default locale', () => {
    vi.mocked(readdirSync).mockReturnValue(['de.json'] as unknown as ReturnType<typeof readdirSync>)

    expect(ignisModuleDependencies({
      rootDir: '/app',
      ignis: {
        content: {
          i18n: {
            enabled: true,
            default: 'de',
          },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual(expect.objectContaining({
      '@nuxtjs/i18n': {
        defaults: {
          locales: [{ code: 'de', file: 'de.json' }],
          defaultLocale: 'de',
        },
      },
    }))

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/i18n module installed with locales: de')
    expect(debugSpy).toHaveBeenCalledTimes(2)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add no modules if i18n disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          i18n: { enabled: false },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add @nuxtjs/seo module if seo enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          seo: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@nuxtjs/seo': {},
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/seo module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should auto-disable ogImage and schemaOrg if ssr is set to false', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          seo: { enabled: true },
        },
        config: {
          nuxt: {
            ssr: false,
          },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@nuxtjs/seo': {},
      'nuxt-og-image': {
        defaults: { enabled: false },
      },
      'nuxt-schema-org': {
        defaults: { enabled: false },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/seo module installed')
    expect(debugSpy).toHaveBeenCalledTimes(3)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should enable zero-runtime sitemap if staticsite is true', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          seo: { enabled: true, staticsite: true },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@nuxtjs/seo': {},
      '@nuxtjs/sitemap': {
        defaults: { zeroRuntime: true },
      },
      'nuxt-og-image': {
        defaults: { zeroRuntime: true },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxtjs/seo module installed')
    expect(debugSpy).toHaveBeenCalledTimes(3)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add @nuxt/content module if content enabled', () => {
    expect(ignisModuleDependencies({
      rootDir: '/mock',
      ignis: {
        content: {
          content: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@nuxt/content': {
        defaults: {
          experimental: {
            sqliteConnector: 'native',
          },
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@nuxt/content module installed')
    expect(debugSpy).toHaveBeenCalledTimes(3)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add no modules if content disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          content: { enabled: false },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add @stefanobartoletti/nuxt-social-share module if social enabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          social: { enabled: true, url: 'https://example.com' },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@stefanobartoletti/nuxt-social-share': {
        defaults: {
          baseUrl: 'https://example.com',
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@stefanobartoletti/nuxt-social-share module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should default social share baseUrl to empty string', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          social: { enabled: true },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({
      '@stefanobartoletti/nuxt-social-share': {
        defaults: {
          baseUrl: '',
        },
      },
    })

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledWith('@stefanobartoletti/nuxt-social-share module installed')
    expect(debugSpy).toHaveBeenCalledTimes(2)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  test('should add no modules if social disabled', () => {
    expect(ignisModuleDependencies({
      ignis: {
        content: {
          social: { enabled: false },
        },
      },
    } as NuxtIgnisContentOptions)).toEqual({})

    expect(debugSpy).toHaveBeenCalledWith('@nuxt-ignis/content - module dependencies are being resolved')
    expect(debugSpy).toHaveBeenCalledTimes(1)

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  // test that nothing breaks if all features are being evaluateed together
  test('should add all modules when all features enabled', () => {
    vi.mocked(readdirSync).mockReturnValue(['en.json'] as unknown as ReturnType<typeof readdirSync>)

    const result = ignisModuleDependencies({
      rootDir: '/app',
      ignis: {
        content: {
          content: { enabled: true },
          i18n: { enabled: true },
          seo: { enabled: true },
          social: { enabled: true, url: 'https://example.com' },
        },
      },
    } as NuxtIgnisContentOptions)

    expect(result['@nuxtjs/i18n']).toBeDefined()
    expect(result['@nuxtjs/seo']).toBeDefined()
    expect(result['@nuxt/content']).toBeDefined()
    expect(result['@stefanobartoletti/nuxt-social-share']).toBeDefined()

    expect(warnSpy).toHaveBeenCalledTimes(0)
  })

  describe('NUXT_OG_IMAGE_SECRET auto-generation', () => {
    beforeEach(async () => {
      // ensure auto-generation can occur in this sub-suite
      delete process.env.NUXT_OG_IMAGE_SECRET
      const fs = await import('node:fs')
      vi.mocked(fs.existsSync).mockReset()
      vi.mocked(fs.readFileSync).mockReset()
      vi.mocked(fs.writeFileSync).mockReset()
    })

    test('should auto-generate NUXT_OG_IMAGE_SECRET in dev mode when seo enabled and ssr on (default)', async () => {
      const fs = await import('node:fs')
      vi.mocked(fs.existsSync).mockReturnValue(false)

      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBeDefined()
      expect(process.env.NUXT_OG_IMAGE_SECRET).toMatch(/^[0-9a-f]{64}$/)
      expect(debugSpy).toHaveBeenCalledWith('NUXT_OG_IMAGE_SECRET auto-generated for nuxt-og-image')
    })

    test('should NOT auto-generate NUXT_OG_IMAGE_SECRET in production mode', () => {
      ignisModuleDependencies({
        dev: false,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBeUndefined()
    })

    test('should not overwrite NUXT_OG_IMAGE_SECRET if already set by the user', () => {
      process.env.NUXT_OG_IMAGE_SECRET = 'user-provided-secret'

      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBe('user-provided-secret')
      expect(debugSpy).not.toHaveBeenCalledWith('NUXT_OG_IMAGE_SECRET auto-generated for nuxt-og-image (dev only, in-memory)')
    })

    test('should not auto-generate NUXT_OG_IMAGE_SECRET when ssr is false', () => {
      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
          config: {
            nuxt: { ssr: false },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBeUndefined()
    })

    test('should not auto-generate NUXT_OG_IMAGE_SECRET when ogImage is explicitly disabled', () => {
      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
        ogImage: { enabled: false },
      } as unknown as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBeUndefined()
    })

    test('should not auto-generate NUXT_OG_IMAGE_SECRET when ogImage zeroRuntime is true', () => {
      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
        ogImage: { zeroRuntime: true },
      } as unknown as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBeUndefined()
    })

    test('should not auto-generate NUXT_OG_IMAGE_SECRET when staticsite is true', () => {
      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true, staticsite: true },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBeUndefined()
    })

    test('should not auto-generate NUXT_OG_IMAGE_SECRET when seo is disabled', () => {
      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: false },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toBeUndefined()
    })

    test('should persist secret to .env when file does not exist', async () => {
      const fs = await import('node:fs')
      vi.mocked(fs.existsSync).mockReturnValue(false)

      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      const [path, content] = vi.mocked(fs.writeFileSync).mock.calls[0]!
      expect(String(path)).toMatch(/\.env$/)
      expect(String(content)).toContain(`NUXT_OG_IMAGE_SECRET=${process.env.NUXT_OG_IMAGE_SECRET}`)
      expect(String(content)).toContain('Auto-generated by @nuxt-ignis/content')
      expect(String(content)).toContain('npx nuxt-og-image generate-secret')
      expect(debugSpy).toHaveBeenCalledWith(expect.stringContaining('persisted to'))
    })

    test('should append secret to existing .env when variable not present', async () => {
      const fs = await import('node:fs')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.readFileSync).mockReturnValue('FOO=bar\n' as unknown as ReturnType<typeof fs.readFileSync>)

      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      const [, content] = vi.mocked(fs.writeFileSync).mock.calls[0]!
      expect(String(content)).toMatch(/^FOO=bar\n/)
      expect(String(content)).toContain('NUXT_OG_IMAGE_SECRET=')
    })

    test('should NOT write to .env when variable is already declared there', async () => {
      const fs = await import('node:fs')
      vi.mocked(fs.existsSync).mockReturnValue(true)
      vi.mocked(fs.readFileSync).mockReturnValue('NUXT_OG_IMAGE_SECRET=existing\n' as unknown as ReturnType<typeof fs.readFileSync>)

      ignisModuleDependencies({
        dev: true,
        rootDir: '/app',
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
      } as NuxtIgnisContentOptions)

      // secret still generated in-memory, but file untouched
      expect(process.env.NUXT_OG_IMAGE_SECRET).toMatch(/^[0-9a-f]{64}$/)
      expect(fs.writeFileSync).not.toHaveBeenCalled()
    })

    test('should not attempt to write .env when rootDir is missing', async () => {
      const fs = await import('node:fs')

      ignisModuleDependencies({
        dev: true,
        ignis: {
          content: {
            seo: { enabled: true },
          },
        },
      } as NuxtIgnisContentOptions)

      expect(process.env.NUXT_OG_IMAGE_SECRET).toMatch(/^[0-9a-f]{64}$/)
      expect(fs.writeFileSync).not.toHaveBeenCalled()
    })
  })
})
