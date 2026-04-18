import { beforeEach, describe, expect, test } from 'vitest'
import { applyEnv } from '../modules/utils/env'

// `applyEnv` is the helper function that transforms given .env variables
// into `ignis` config object prior to Nuxt Ignis module resolution

describe('unit tests for `applyEnv` function', () => {
  // store original process.env to restore it after tests
  const OLD_ENV = process.env

  beforeEach(() => {
    // restore env before each test
    process.env = { ...OLD_ENV }
  })

  // output with no settings and no .env provided

  test('applyEnv - empty .env + no settings', async () => {
    const ignisConfig = {}
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/empty.txt')
  })

  // output with some settings and no .env provided

  test('applyEnv - empty .env + custom settings', async () => {
    const ignisConfig = {
      config: {
        html: {
          title: 'Test',
        },
      },
    }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/custom.txt')
  })

  // --- config ---

  const CONFIG_OBJECT = {
    config: {
      html: { title: 'Custom App', lang: 'de' },
      nuxt: { ssr: false, pages: false, css: 'custom.css', error: false },
      log: { level: 'debug' as const },
      warn: { duplicates: false },
    },
  }

  function setConfigEnv() {
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_HTML_TITLE = 'Env App Title'
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_HTML_LANG = 'fr'
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_SSR = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_PAGES = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_CSS = 'env.css'
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_ERROR = 'false'
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_LOG_LEVEL = 'debug'
    process.env.NUXT_PUBLIC_IGNIS_CONFIG_WARN_DUPLICATES = 'false'
  }

  test('applyEnv - config via ignisConfig', async () => {
    const ignisConfig = { ...CONFIG_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/config-obj.txt')
  })

  test('applyEnv - config via process.env', async () => {
    const ignisConfig = {}
    setConfigEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/config-env.txt')
  })

  test('applyEnv - config env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...CONFIG_OBJECT }
    setConfigEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/config-both.txt')
  })

  // --- preset ---

  const PRESET_OBJECT = {
    preset: {
      ui: 'tailwind' as const,
      db: 'neon' as const,
      forms: 'formkit' as const,
      validation: 'zod' as const,
    },
  }

  function setPresetEnv() {
    process.env.NUXT_PUBLIC_IGNIS_PRESET_UI = 'nuxt-ui'
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = 'supabase'
    process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS = 'vueform'
    process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION = 'valibot'
  }

  test('applyEnv - preset via ignisConfig', async () => {
    const ignisConfig = { ...PRESET_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/preset-obj.txt')
  })

  test('applyEnv - preset via process.env', async () => {
    const ignisConfig = {}
    setPresetEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/preset-env.txt')
  })

  test('applyEnv - preset env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...PRESET_OBJECT }
    setPresetEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/preset-both.txt')
  })

  // --- default ---

  const DEFAULT_OBJECT = {
    default: {
      eslint: false,
      fonts: false,
      image: false,
      scripts: false,
      security: false,
      auth: false,
      vueuse: false,
      pinia: false,
      css: false,
    },
  }

  function setDefaultEnv() {
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_ESLINT = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_FONTS = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_IMAGE = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_SCRIPTS = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_SECURITY = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_AUTH = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_VUEUSE = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_PINIA = 'false'
    process.env.NUXT_PUBLIC_IGNIS_DEFAULT_CSS = 'false'
  }

  test('applyEnv - default via ignisConfig', async () => {
    const ignisConfig = { ...DEFAULT_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/default-obj.txt')
  })

  test('applyEnv - default via process.env', async () => {
    const ignisConfig = {}
    setDefaultEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/default-env.txt')
  })

  test('applyEnv - default env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...DEFAULT_OBJECT }
    setDefaultEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/default-both.txt')
  })

  // --- ui ---

  const UI_OBJECT = {
    ui: {
      ui: true,
      tailwind: true,
      openprops: true,
      charts: true,
    },
  }

  function setUiEnv() {
    process.env.NUXT_PUBLIC_IGNIS_UI_UI = 'true'
    process.env.NUXT_PUBLIC_IGNIS_UI_TAILWIND = 'true'
    process.env.NUXT_PUBLIC_IGNIS_UI_OPENPROPS = 'true'
    process.env.NUXT_PUBLIC_IGNIS_UI_CHARTS = 'true'
  }

  test('applyEnv - ui via ignisConfig', async () => {
    const ignisConfig = { ...UI_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/ui-obj.txt')
  })

  test('applyEnv - ui via process.env', async () => {
    const ignisConfig = {}
    setUiEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/ui-env.txt')
  })

  test('applyEnv - ui env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...UI_OBJECT }
    setUiEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/ui-both.txt')
  })

  // --- db ---

  const DB_OBJECT = {
    db: {
      neon: { enabled: true },
      supabase: { enabled: true, types: 'custom-types' },
    },
  }

  function setDbEnv() {
    process.env.NUXT_PUBLIC_IGNIS_DB_NEON_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_DB_SUPABASE_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_DB_SUPABASE_TYPES = 'env-types'
  }

  test('applyEnv - db via ignisConfig', async () => {
    const ignisConfig = { ...DB_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/db-obj.txt')
  })

  test('applyEnv - db via process.env', async () => {
    const ignisConfig = {}
    setDbEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/db-env.txt')
  })

  test('applyEnv - db env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...DB_OBJECT }
    setDbEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/db-both.txt')
  })

  // --- forms ---

  const FORMS_OBJECT = {
    forms: {
      formkit: { enabled: true, default: 'text', config: 'formkit.config.ts' },
      vueform: { enabled: true },
    },
  }

  function setFormsEnv() {
    process.env.NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_DEFAULT = 'textarea'
    process.env.NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_CONFIG = 'formkit.env.ts'
    process.env.NUXT_PUBLIC_IGNIS_FORMS_VUEFORM_ENABLED = 'true'
  }

  test('applyEnv - forms via ignisConfig', async () => {
    const ignisConfig = { ...FORMS_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/forms-obj.txt')
  })

  test('applyEnv - forms via process.env', async () => {
    const ignisConfig = {}
    setFormsEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/forms-env.txt')
  })

  test('applyEnv - forms env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...FORMS_OBJECT }
    setFormsEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/forms-both.txt')
  })

  // --- validation ---

  const VALIDATION_OBJECT = {
    validation: {
      zod: true,
      valibot: true,
    },
  }

  function setValidationEnv() {
    process.env.NUXT_PUBLIC_IGNIS_VALIDATION_ZOD = 'true'
    process.env.NUXT_PUBLIC_IGNIS_VALIDATION_VALIBOT = 'true'
  }

  test('applyEnv - validation via ignisConfig', async () => {
    const ignisConfig = { ...VALIDATION_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/validation-obj.txt')
  })

  test('applyEnv - validation via process.env', async () => {
    const ignisConfig = {}
    setValidationEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/validation-env.txt')
  })

  test('applyEnv - validation env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...VALIDATION_OBJECT }
    setValidationEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/validation-both.txt')
  })

  // --- content ---

  const CONTENT_OBJECT = {
    content: {
      content: { enabled: true },
      i18n: { enabled: true, default: 'en' },
      seo: { enabled: true },
      social: { enabled: true, url: 'https://example.com' },
      pslo: { enabled: true, content: true },
    },
  }

  function setContentEnv() {
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_CONTENT_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_I18N_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_I18N_DEFAULT = 'fr'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_SEO_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_URL = 'https://env.example.com'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_PSLO_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_CONTENT_PSLO_CONTENT = 'true'
  }

  test('applyEnv - content via ignisConfig', async () => {
    const ignisConfig = { ...CONTENT_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/content-obj.txt')
  })

  test('applyEnv - content via process.env', async () => {
    const ignisConfig = {}
    setContentEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/content-env.txt')
  })

  test('applyEnv - content env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...CONTENT_OBJECT }
    setContentEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/content-both.txt')
  })

  // --- utils ---

  const UTILS_OBJECT = {
    utils: {
      equipment: { enabled: true, composables: 'composables/', plugins: 'plugins/' },
      regexp: { enabled: true },
    },
  }

  function setUtilsEnv() {
    process.env.NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_ENABLED = 'true'
    process.env.NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_COMPOSABLES = 'env-composables/'
    process.env.NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_PLUGINS = 'env-plugins/'
    process.env.NUXT_PUBLIC_IGNIS_UTILS_REGEXP_ENABLED = 'true'
  }

  test('applyEnv - utils via ignisConfig', async () => {
    const ignisConfig = { ...UTILS_OBJECT }
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/utils-obj.txt')
  })

  test('applyEnv - utils via process.env', async () => {
    const ignisConfig = {}
    setUtilsEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/utils-env.txt')
  })

  test('applyEnv - utils env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...UTILS_OBJECT }
    setUtilsEnv()
    applyEnv(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/utils-both.txt')
  })
})
