import { describe, expect, test, vi } from 'vitest'

// `log` is a Nuxt auto-import global — provide it on globalThis for the unit test environment
const mockLog = { debug: vi.fn(), warn: vi.fn(), error: vi.fn() }
;(globalThis as Record<string, unknown>).log = mockLog

// mock the JSON import — @/../i18n alias is resolved by Nuxt, not Vitest
vi.mock('@/../i18n/locales/en.json', () => ({
  default: {
    title: 'Nuxt Ignis',
    features: {
      nuxt: 'Nuxt application framework atop Vue.js',
      eslint: {
        dscr: 'Linting for better DevEx',
      },
    },
  },
}))

// import after mock is set up
const { useIgnisT } = await import('../../app/composables/useTranslation')

describe('useIgnisT', () => {
  describe('top-level keys', () => {
    test('returns value for existing top-level key', () => {
      expect(useIgnisT('title')).toBe('Nuxt Ignis')
    })

    test('returns ??? for non-existing top-level key', () => {
      expect(useIgnisT('nonExistingKey')).toBe('???')
    })
  })

  describe('nested keys (dot notation)', () => {
    test('returns value for existing nested key', () => {
      expect(useIgnisT('features.nuxt')).toBe('Nuxt application framework atop Vue.js')
    })

    test('returns value for existing double-nested key', () => {
      expect(useIgnisT('features.eslint.dscr')).toBe('Linting for better DevEx')
    })

    test('returns ??? for partially matching nested key', () => {
      expect(useIgnisT('features.react')).toBe('???')
    })

    test('returns ??? for fully non-existing nested key', () => {
      expect(useIgnisT('foo.bar.baz')).toBe('???')
    })
  })

  describe('edge cases', () => {
    test('returns ??? for empty string key', () => {
      expect(useIgnisT('')).toBe('???')
    })

    test('returns ??? when key resolves to an object, not a string', () => {
      // "features" exists but is a nested object, not a leaf string
      expect(useIgnisT('features')).toBe('???')
    })
  })
})
