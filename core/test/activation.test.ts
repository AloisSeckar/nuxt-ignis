import { describe, expect, test } from 'vitest'
import {
  isCoreActive, isUiActive, isDbActive, isFormsActive,
  isValidationActive, isContentActive, isUtilsActive,
} from '../modules/utils/activation'

// functions from core/modules/utils/activation.ts are used to determine
// whether a sub-module should be registered during module setup phase

describe('unit tests for checker functions for sub-modules activation', () => {
  describe('isCoreActive', () => {
    test('returns true when opts.core is undefined', () => {
      expect(isCoreActive({})).toBe(true)
    })

    test('returns true when opts.core is empty object', () => {
      expect(isCoreActive({ core: {} })).toBe(true)
    })

    test('returns true when at least one core feature is enabled', () => {
      expect(isCoreActive({ core: { eslint: true } })).toBe(true)
      expect(isCoreActive({ core: { fonts: true } })).toBe(true)
      expect(isCoreActive({ core: { image: true } })).toBe(true)
      expect(isCoreActive({ core: { scripts: true } })).toBe(true)
      expect(isCoreActive({ core: { security: true } })).toBe(true)
      expect(isCoreActive({ core: { auth: true } })).toBe(true)
      expect(isCoreActive({ core: { vueuse: true } })).toBe(true)
      expect(isCoreActive({ core: { pinia: true } })).toBe(true)
    })

    test('returns false only when all core features are explicitly false', () => {
      expect(isCoreActive({
        core: { eslint: false, fonts: false, image: false, scripts: false, security: false, auth: false, vueuse: false, pinia: false },
      })).toBe(false)
    })

    test('returns true when multiple core features are enabled', () => {
      expect(isCoreActive({ core: { eslint: true, pinia: true } })).toBe(true)
    })
  })

  describe('isUiActive', () => {
    test('returns false when opts.ui is undefined and no preset', () => {
      expect(isUiActive({})).toBe(false)
    })

    test('returns false when opts.ui is empty object and no preset', () => {
      expect(isUiActive({ ui: {} })).toBe(false)
    })

    test('returns true when ui preset is set to a valid value', () => {
      expect(isUiActive({ preset: { ui: 'nuxt-ui' } })).toBe(true)
      expect(isUiActive({ preset: { ui: 'tailwind' } })).toBe(true)
    })

    test('returns false when ui preset is "off"', () => {
      expect(isUiActive({ preset: { ui: 'off' } })).toBe(false)
    })

    test('returns true when at least one UI feature is enabled', () => {
      expect(isUiActive({ ui: { ui: true } })).toBe(true)
      expect(isUiActive({ ui: { tailwind: true } })).toBe(true)
      expect(isUiActive({ ui: { openprops: true } })).toBe(true)
      expect(isUiActive({ ui: { charts: true } })).toBe(true)
    })

    test('returns false when all UI features are false', () => {
      expect(isUiActive({ ui: { ui: false, tailwind: false, openprops: false, charts: false } })).toBe(false)
    })

    test('preset takes priority even when ui options are empty', () => {
      expect(isUiActive({ preset: { ui: 'nuxt-ui' }, ui: {} })).toBe(true)
    })
  })

  describe('isDbActive', () => {
    test('returns false when opts.db is undefined and no preset', () => {
      expect(isDbActive({})).toBe(false)
    })

    test('returns false when opts.db is empty object and no preset', () => {
      expect(isDbActive({ db: {} })).toBe(false)
    })

    test('returns true when db preset is set to a valid value', () => {
      expect(isDbActive({ preset: { db: 'neon' } })).toBe(true)
      expect(isDbActive({ preset: { db: 'supabase' } })).toBe(true)
    })

    test('returns false when db preset is "off"', () => {
      expect(isDbActive({ preset: { db: 'off' } })).toBe(false)
    })

    test('returns true when neon is enabled', () => {
      expect(isDbActive({ db: { neon: { enabled: true } } })).toBe(true)
    })

    test('returns true when supabase is enabled', () => {
      expect(isDbActive({ db: { supabase: { enabled: true } } })).toBe(true)
    })

    test('returns false when connectors are present but not enabled', () => {
      expect(isDbActive({ db: { neon: { enabled: false }, supabase: { enabled: false } } })).toBe(false)
    })
  })

  describe('isFormsActive', () => {
    test('returns false when opts.forms is undefined and no preset', () => {
      expect(isFormsActive({})).toBe(false)
    })

    test('returns false when opts.forms is empty object and no preset', () => {
      expect(isFormsActive({ forms: {} })).toBe(false)
    })

    test('returns true when forms preset is set to a valid value', () => {
      expect(isFormsActive({ preset: { forms: 'formkit' } })).toBe(true)
      expect(isFormsActive({ preset: { forms: 'vueform' } })).toBe(true)
    })

    test('returns false when forms preset is "off"', () => {
      expect(isFormsActive({ preset: { forms: 'off' } })).toBe(false)
    })

    test('returns true when formkit is enabled', () => {
      expect(isFormsActive({ forms: { formkit: { enabled: true } } })).toBe(true)
    })

    test('returns true when vueform is enabled', () => {
      expect(isFormsActive({ forms: { vueform: { enabled: true } } })).toBe(true)
    })

    test('returns false when form providers are present but not enabled', () => {
      expect(isFormsActive({ forms: { formkit: { enabled: false }, vueform: { enabled: false } } })).toBe(false)
    })
  })

  describe('isValidationActive', () => {
    test('returns false when opts.validation is undefined and no preset', () => {
      expect(isValidationActive({})).toBe(false)
    })

    test('returns false when opts.validation is empty object and no preset', () => {
      expect(isValidationActive({ validation: {} })).toBe(false)
    })

    test('returns true when validation preset is set to a valid value', () => {
      expect(isValidationActive({ preset: { validation: 'zod' } })).toBe(true)
      expect(isValidationActive({ preset: { validation: 'valibot' } })).toBe(true)
    })

    test('returns false when validation preset is "off"', () => {
      expect(isValidationActive({ preset: { validation: 'off' } })).toBe(false)
    })

    test('returns true when zod is enabled', () => {
      expect(isValidationActive({ validation: { zod: true } })).toBe(true)
    })

    test('returns true when valibot is enabled', () => {
      expect(isValidationActive({ validation: { valibot: true } })).toBe(true)
    })

    test('returns false when all validation libs are false', () => {
      expect(isValidationActive({ validation: { zod: false, valibot: false } })).toBe(false)
    })
  })

  describe('isContentActive', () => {
    test('returns false when opts.content is undefined', () => {
      expect(isContentActive({})).toBe(false)
    })

    test('returns false when opts.content is empty object', () => {
      expect(isContentActive({ content: {} })).toBe(false)
    })

    test('returns true when content is enabled', () => {
      expect(isContentActive({ content: { content: { enabled: true } } })).toBe(true)
    })

    test('returns true when i18n is enabled', () => {
      expect(isContentActive({ content: { i18n: { enabled: true } } })).toBe(true)
    })

    test('returns true when seo is enabled', () => {
      expect(isContentActive({ content: { seo: { enabled: true } } })).toBe(true)
    })

    test('returns true when social is enabled', () => {
      expect(isContentActive({ content: { social: { enabled: true } } })).toBe(true)
    })

    test('returns true when pslo is enabled', () => {
      expect(isContentActive({ content: { pslo: { enabled: true } } })).toBe(true)
    })

    test('returns false when all content features are disabled', () => {
      expect(isContentActive({
        content: {
          content: { enabled: false },
          i18n: { enabled: false },
          seo: { enabled: false },
          social: { enabled: false },
          pslo: { enabled: false },
        },
      })).toBe(false)
    })
  })

  describe('isUtilsActive', () => {
    test('returns false when opts.utils is undefined', () => {
      expect(isUtilsActive({})).toBe(false)
    })

    test('returns false when opts.utils is empty object', () => {
      expect(isUtilsActive({ utils: {} })).toBe(false)
    })

    test('returns true when equipment is enabled', () => {
      expect(isUtilsActive({ utils: { equipment: { enabled: true } } })).toBe(true)
    })

    test('returns true when regexp is enabled', () => {
      expect(isUtilsActive({ utils: { regexp: { enabled: true } } })).toBe(true)
    })

    test('returns false when all utils are disabled', () => {
      expect(isUtilsActive({ utils: { equipment: { enabled: false }, regexp: { enabled: false } } })).toBe(false)
    })
  })
})
