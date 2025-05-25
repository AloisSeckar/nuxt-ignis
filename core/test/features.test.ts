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

  // preset - DB

  test('setFeatures() - DB preset - nuxt-ui', async () => {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = 'neon'
    setFeatures()
    await expect(getConsoleOutput()).toMatchFileSnapshot('./features/db-neon.txt')
  })

  test('setFeatures() - DB preset - tailwind', async () => {
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
})
