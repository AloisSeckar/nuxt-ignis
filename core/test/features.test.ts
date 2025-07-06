import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { setFeatures } from '../features'
import { log } from '../utils/consola'

// `setFeatures()` is the core function that evaluates the environment variables
// and decides which features to enable in the user's Nuxt application

describe('setFeatures() unit tests', () => {
  // store original process.env to restore it after tests
  const OLD_ENV = process.env

  // mock consola instance for listening to `setFeatures()` method output
  const consoleSpy = vi.spyOn(log, 'info').mockImplementation(() => {})

  // helper function to get the console output from the spy
  function getConsoleOutput() {
    return consoleSpy.mock.calls[0]![0] as string
  }

  beforeEach(() => {
    // restore env before each test
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    // clear the console spy after each test
    vi.clearAllMocks()
  })

  // output with no settings provided

  test('setFeatures() - default output', async () => {
    expect(setFeatures).toBeDefined()
    setFeatures()
    expect(consoleSpy).toHaveBeenCalledOnce()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/default.txt')
  })

  // following test cases are checking whether presets are evaluated correctly

  // preset - UI

  test('setFeatures() - UI preset - nuxt-ui', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_UI = 'nuxt-ui'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/ui-nuxt-ui.txt')
  })

  test('setFeatures() - UI preset - tailwind', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_UI = 'tailwind'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/ui-tailwind.txt')
  })

  test('setFeatures() - UI preset - off', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_UI = 'off'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/ui-off.txt')
  })

  test('setFeatures() - UI preset - invalid', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_UI = 'invalid'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/ui-off.txt')
  })

  // UI - set directly

  test('setFeatures() - UI - nuxt-ui', async () => {
    process.env.NUXT_PUBLIC_IGNIS_UI = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/ui-nuxt-ui.txt')
  })

  test('setFeatures() - UI - tailwind', async () => {
    process.env.NUXT_PUBLIC_IGNIS_TAILWIND = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/ui-tailwind.txt')
  })

  // preset - DB

  test('setFeatures() - DB preset - neon', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = 'neon'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/db-neon.txt')
  })

  test('setFeatures() - DB preset - supabase', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = 'supabase'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/db-supabase.txt')
  })

  test('setFeatures() - DB preset - off', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = 'off'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/db-off.txt')
  })

  test('setFeatures() - DB preset - invalid', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = 'invalid'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/db-off.txt')
  })

  // DB - set directly

  test('setFeatures() - DB - neon', async () => {
    process.env.NUXT_PUBLIC_IGNIS_NEON = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/db-neon.txt')
  })

  test('setFeatures() - DB - supabase', async () => {
    process.env.NUXT_PUBLIC_IGNIS_SUPABASE = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/db-supabase.txt')
  })

  // preset - forms

  test('setFeatures() - forms preset - vueform', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS = 'vueform'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/forms-vueform.txt')
  })

  test('setFeatures() - forms preset - formkit', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS = 'formkit'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/forms-formkit.txt')
  })

  test('setFeatures() - forms preset - off', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS = 'off'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/forms-off.txt')
  })

  test('setFeatures() - forms preset - invalid', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS = 'invalid'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/forms-off.txt')
  })

  // forms - set directly

  test('setFeatures() - forms - vueform', async () => {
    process.env.NUXT_PUBLIC_IGNIS_VUEFORM = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/forms-vueform.txt')
  })

  test('setFeatures() - forms - formkit', async () => {
    process.env.NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/forms-formkit.txt')
  })

  // preset - validation

  test('setFeatures() - validation preset - valibot', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION = 'valibot'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/validation-valibot.txt')
  })

  test('setFeatures() - validation preset - zod', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION = 'zod'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/validation-zod.txt')
  })

  test('setFeatures() - validation preset - off', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION = 'off'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/validation-off.txt')
  })

  test('setFeatures() - validation preset - invalid', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION = 'invalid'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/validation-off.txt')
  })

  // validation - set directly

  test('setFeatures() - validation - valibot', async () => {
    process.env.NUXT_PUBLIC_IGNIS_VALIBOT = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/validation-valibot.txt')
  })

  test('setFeatures() - validation - zod', async () => {
    process.env.NUXT_PUBLIC_IGNIS_ZOD = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/validation-zod.txt')
  })

  // disable "core" features
  test('setFeatures() - disable core features', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CORE_ESLINT = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CORE_FONTS = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CORE_IMAGE = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CORE_PINIA = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CORE_SCRIPTS = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CORE_SECURITY = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CORE_VUEUSE = 'false'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/disable-core.txt')
  })

  // enable all features
  test('setFeatures() - enable all features', async () => {
    process.env.NUXT_PUBLIC_IGNIS_UI = 'true'
    process.env.NUXT_PUBLIC_IGNIS_NEON = 'true'
    process.env.NUXT_PUBLIC_IGNIS_SUPABASE = 'true'
    process.env.NUXT_PUBLIC_IGNIS_I18N_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_VUEFORM = 'true'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT = 'true'
    process.env.NUXT_PUBLIC_IGNIS_OPENPROPS = 'true'
    process.env.NUXT_PUBLIC_IGNIS_PSLO_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_SEO = 'true'
    process.env.NUXT_PUBLIC_IGNIS_AUTH = 'true'
    process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES = 'false' // to avoid console log
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/enable-all.txt')
  })

  // Vue Equipment

  test('setFeatures() - Vue Equipment - none', async () => {
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/equipment.txt')
  })

  // Magic Regexp

  test('setFeatures() - Magic Regexp - none', async () => {
    process.env.NUXT_PUBLIC_IGNIS_REGEXP = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/regexp.txt')
  })

  // Nuxt Charts

  test('setFeatures() - Nuxt Charts - none', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CHARTS = 'true'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/charts.txt')
  })
})
