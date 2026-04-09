import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { resolveDbPreset, resolveFormsPreset, resolveUiPreset, resolveValidationPreset } from '../modules/utils/presets'

// functions from `core/modules/utils/presets.ts` are used to evaluate
// `preset` config key of IgnisOptions and adjust configuration accordingly

describe('unit tests for resolving preset options', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  describe('resolveUiPreset', () => {
    test('nuxt-ui', () => {
      expect(resolveUiPreset('nuxt-ui')).toEqual({ ui: true })
    })

    test('tailwind', () => {
      expect(resolveUiPreset('tailwind')).toEqual({ tailwind: true })
    })

    test('off', () => {
      expect(resolveUiPreset('off')).toBeUndefined()
    })

    test('undefined', () => {
      expect(resolveUiPreset(undefined)).toBeUndefined()
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('invalid value warns', () => {
      expect(resolveUiPreset('invalid' as 'off')).toBeUndefined()
      expect(warnSpy).toHaveBeenCalledWith(
        'Invalid UI preset value "invalid" provided. Supported values are "nuxt-ui" | "tailwind" | "off". Defaulting to "off".',
      )
    })
  })

  describe('resolveDbPreset', () => {
    test('neon', () => {
      expect(resolveDbPreset('neon')).toEqual({ neon: true })
    })

    test('supabase', () => {
      expect(resolveDbPreset('supabase')).toEqual({ supabase: true })
    })

    test('off', () => {
      expect(resolveDbPreset('off')).toBeUndefined()
    })

    test('undefined', () => {
      expect(resolveDbPreset(undefined)).toBeUndefined()
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('invalid value warns', () => {
      expect(resolveDbPreset('invalid' as 'off')).toBeUndefined()
      expect(warnSpy).toHaveBeenCalledWith(
        'Invalid DB preset value "invalid" provided. Supported values are "neon" | "supabase" | "off". Defaulting to "off".',
      )
    })
  })

  describe('resolveFormsPreset', () => {
    test('vueform', () => {
      expect(resolveFormsPreset('vueform')).toEqual({ vueform: { enabled: true } })
    })

    test('formkit', () => {
      expect(resolveFormsPreset('formkit')).toEqual({ formkit: { enabled: true } })
    })

    test('off', () => {
      expect(resolveFormsPreset('off')).toBeUndefined()
    })

    test('undefined', () => {
      expect(resolveFormsPreset(undefined)).toBeUndefined()
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('invalid value warns', () => {
      expect(resolveFormsPreset('invalid' as 'off')).toBeUndefined()
      expect(warnSpy).toHaveBeenCalledWith(
        'Invalid Forms preset value "invalid" provided. Supported values are "vueform" | "formkit" | "off". Defaulting to "off".',
      )
    })
  })

  describe('resolveValidationPreset', () => {
    test('zod', () => {
      expect(resolveValidationPreset('zod')).toEqual({ zod: true })
    })

    test('valibot', () => {
      expect(resolveValidationPreset('valibot')).toEqual({ valibot: true })
    })

    test('off', () => {
      expect(resolveValidationPreset('off')).toBeUndefined()
    })

    test('undefined', () => {
      expect(resolveValidationPreset(undefined)).toBeUndefined()
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('invalid value warns', () => {
      expect(resolveValidationPreset('invalid' as 'off')).toBeUndefined()
      expect(warnSpy).toHaveBeenCalledWith(
        'Invalid Validation preset value "invalid" provided. Supported values are "zod" | "valibot" | "off". Defaulting to "off".',
      )
    })
  })
})
