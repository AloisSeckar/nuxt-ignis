import { beforeEach, describe, expect, test } from 'vitest'
import { setFeatures } from '../features'

// `setFeatures()` is the core function that evaluates the environment variables
// and decides which features to enable in the user's Nuxt application
// this suite test the nuxtConfig object output, whether it matches the intended values

describe('nuxtConfig unit tests', () => {
  // store original process.env to restore it after tests
  const OLD_ENV = process.env

  beforeEach(() => {
    // restore env before each test
    process.env = { ...OLD_ENV }
  })

  // output with no settings provided

  test('nuxtConfig - default output', async () => {
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/default.txt')
  })

  // Vue Equipment

  test('nuxtConfig - Vue Equipment - 1 composable', async () => {
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES = 'useScrollTo'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/equipment-1-composable.txt')
  })

  test('setFeatures() - Vue Equipment - 2 plugins', async () => {
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS = 'MagicMenu, MagicModal'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/equipment-2-plugins.txt')
  })

  test('setFeatures() - Vue Equipment - composables + plugins', async () => {
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES = 'useCountdown,useScrollTo'
    process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS = 'MagicMenu, MagicModal , MagicCookie'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/equipment-all.txt')
  })
})
