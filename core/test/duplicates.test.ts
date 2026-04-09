import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { checkForDuplicateModules } from '../modules/utils/duplicates'

// `checkForDuplicateModules` is the helper function that checks the Ignis configuration
// for duplicated modules and issues warnings if necessary

describe('unit tests for `checkForDuplicateModules` function', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    warnSpy.mockRestore()
  })

  test('no warnings when no modules are active', () => {
    checkForDuplicateModules({})
    expect(warnSpy).not.toHaveBeenCalled()
  })

  // UI duplicates
  describe('UI duplicates', () => {
    test('warns when both Nuxt UI and Tailwind are active', () => {
      checkForDuplicateModules({ ui: { ui: true, tailwind: true } })
      expect(warnSpy).toHaveBeenCalledOnce()
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Nuxt UI and Tailwind CSS'))
    })

    test('no warning when only Nuxt UI is active', () => {
      checkForDuplicateModules({ ui: { ui: true, tailwind: false } })
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('no warning when only Tailwind is active', () => {
      checkForDuplicateModules({ ui: { ui: false, tailwind: true } })
      expect(warnSpy).not.toHaveBeenCalled()
    })
  })

  // DB duplicates
  describe('DB duplicates', () => {
    test('warns when both Neon and Supabase are enabled', () => {
      checkForDuplicateModules({ db: { neon: { enabled: true }, supabase: { enabled: true } } })
      expect(warnSpy).toHaveBeenCalledOnce()
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Neon and Supabase'))
    })

    test('no warning when only Neon is enabled', () => {
      checkForDuplicateModules({ db: { neon: { enabled: true }, supabase: { enabled: false } } })
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('no warning when only Supabase is enabled', () => {
      checkForDuplicateModules({ db: { neon: { enabled: false }, supabase: { enabled: true } } })
      expect(warnSpy).not.toHaveBeenCalled()
    })
  })

  // Forms duplicates
  describe('Forms duplicates', () => {
    test('warns when both Vueform and Formkit are enabled', () => {
      checkForDuplicateModules({ forms: { vueform: { enabled: true }, formkit: { enabled: true } } })
      expect(warnSpy).toHaveBeenCalledOnce()
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Vueform and Formkit'))
    })

    test('no warning when only Vueform is enabled', () => {
      checkForDuplicateModules({ forms: { vueform: { enabled: true }, formkit: { enabled: false } } })
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('no warning when only Formkit is enabled', () => {
      checkForDuplicateModules({ forms: { vueform: { enabled: false }, formkit: { enabled: true } } })
      expect(warnSpy).not.toHaveBeenCalled()
    })
  })

  // Validation duplicates
  describe('Validation duplicates', () => {
    test('warns when both Zod and Valibot are active', () => {
      checkForDuplicateModules({ validation: { zod: true, valibot: true } })
      expect(warnSpy).toHaveBeenCalledOnce()
      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Zod and Valibot'))
    })

    test('no warning when only Zod is active', () => {
      checkForDuplicateModules({ validation: { zod: true, valibot: false } })
      expect(warnSpy).not.toHaveBeenCalled()
    })

    test('no warning when only Valibot is active', () => {
      checkForDuplicateModules({ validation: { zod: false, valibot: true } })
      expect(warnSpy).not.toHaveBeenCalled()
    })
  })

  // Multiple duplicate categories at once
  test('warns multiple times when duplicates exist in multiple categories', () => {
    checkForDuplicateModules({
      ui: { ui: true, tailwind: true },
      db: { neon: { enabled: true }, supabase: { enabled: true } },
      forms: { vueform: { enabled: true }, formkit: { enabled: true } },
      validation: { zod: true, valibot: true },
    })
    expect(warnSpy).toHaveBeenCalledTimes(4)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Nuxt UI and Tailwind CSS'))
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Neon and Supabase'))
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Vueform and Formkit'))
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('Zod and Valibot'))
  })
})
