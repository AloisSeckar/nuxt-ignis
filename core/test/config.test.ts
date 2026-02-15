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

  // UI

  test('nuxtConfig - UI - Nuxt UI', async () => {
    process.env.NUXT_PUBLIC_IGNIS_UI = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/ui-nuxt-ui.txt')
  })

  test('nuxtConfig - UI - Tailwind', async () => {
    process.env.NUXT_PUBLIC_IGNIS_TAILWIND = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/ui-tailwind.txt')
  })

  // DB

  test('nuxtConfig - DB - Neon', async () => {
    process.env.NUXT_PUBLIC_IGNIS_NEON = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/db-neon.txt')
  })

  test('nuxtConfig - DB - Supabase', async () => {
    process.env.NUXT_PUBLIC_IGNIS_SUPABASE_ENABLED = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/db-supabase.txt')
  })

  // forms

  test('nuxtConfig - Forms - Vueform', async () => {
    process.env.NUXT_PUBLIC_IGNIS_VUEFORM = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/forms-vueform.txt')
  })

  test('nuxtConfig - Forms - Formkit', async () => {
    process.env.NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/forms-formkit.txt')
  })

  // i18n

  test('nuxtConfig - i18n', async () => {
    process.env.NUXT_PUBLIC_IGNIS_I18N_ENABLED = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/i18n.txt')
  })

  // SEO

  test('nuxtConfig - SEO + ssr=false', async () => {
    process.env.NUXT_PUBLIC_IGNIS_SEO = 'true'
    process.env.NUXT_PUBLIC_IGNIS_SSR = 'false'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/seo-ssr-false.txt')
  })

  // Nuxt Social Share

  test('nuxtConfig - Nuxt Social Share', async () => {
    process.env.NUXT_PUBLIC_IGNIS_SOCIAL_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_SOCIAL_URL = 'https://nuxt-ignis.com'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/social.txt')
  })

  // Open Props

  test('nuxtConfig - Open Props', async () => {
    process.env.NUXT_PUBLIC_IGNIS_OPENPROPS = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/open-props.txt')
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

  // custom CSS files
  test('nuxtConfig - custom CSS files - single', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CSS = 'first.css '
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/css-single.txt')
  })

  test('nuxtConfig - custom CSS files - multiple', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CSS = ' first.css , second.css,third.css'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/css-multiple.txt')
  })

  test('nuxtConfig - custom CSS files - with Nuxt UI', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CSS = 'custom.css'
    process.env.NUXT_PUBLIC_IGNIS_UI = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/css-nuxt-ui.txt')
  })

  test('nuxtConfig - custom CSS files - with Tailwind CSS', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CSS = 'custom.css'
    process.env.NUXT_PUBLIC_IGNIS_TAILWIND = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/css-tailwind.txt')
  })

  test('nuxtConfig - custom CSS files - with Open Props', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CSS = 'custom.css'
    process.env.NUXT_PUBLIC_IGNIS_OPENPROPS = 'true'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/css-open-props.txt')
  })

  // HTML

  test('setFeatures() - custom html lang', async () => {
    process.env.NUXT_PUBLIC_IGNIS_HTML_LANG = 'en-US'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/custom-lang.txt')
  })

  test('setFeatures() - no default CSS', async () => {
    process.env.NUXT_PUBLIC_IGNIS_CORE_CSS = 'false'
    const nuxtConfig = setFeatures()
    await expect(nuxtConfig).toMatchFileSnapshot('./config/no-default-css.txt')
  })
})
