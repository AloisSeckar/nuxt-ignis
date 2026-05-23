import { beforeEach, describe, expect, test } from 'vitest'
import { envApply } from '../../modules/utils/env-apply'

// `envApply` is the helper function that transforms given .env variables
// into `ignis` config object prior to Nuxt Ignis module resolution

describe('unit tests for `envApply` function', () => {
  // store original process.env to restore it after tests
  const OLD_ENV = process.env

  beforeEach(() => {
    // restore env before each test
    process.env = { ...OLD_ENV }
  })

  // output with no settings and no .env provided

  test('envApply - empty .env + no settings', async () => {
    const ignisConfig = {}
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/empty.txt')
  })

  // output with some settings and no .env provided

  test('envApply - empty .env + custom settings', async () => {
    const ignisConfig = {
      config: {
        html: {
          title: 'Test',
        },
      },
    }
    envApply(ignisConfig)
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

  test('envApply - config via ignisConfig', async () => {
    const ignisConfig = { ...CONFIG_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/config-obj.txt')
  })

  test('envApply - config via process.env', async () => {
    const ignisConfig = {}
    setConfigEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/config-env.txt')
  })

  test('envApply - config env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...CONFIG_OBJECT }
    setConfigEnv()
    envApply(ignisConfig)
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

  test('envApply - preset via ignisConfig', async () => {
    const ignisConfig = { ...PRESET_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/preset-obj.txt')
  })

  test('envApply - preset via process.env', async () => {
    const ignisConfig = {}
    setPresetEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/preset-env.txt')
  })

  test('envApply - preset env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...PRESET_OBJECT }
    setPresetEnv()
    envApply(ignisConfig)
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

  test('envApply - default via ignisConfig', async () => {
    const ignisConfig = { ...DEFAULT_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/default-obj.txt')
  })

  test('envApply - default via process.env', async () => {
    const ignisConfig = {}
    setDefaultEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/default-env.txt')
  })

  test('envApply - default env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...DEFAULT_OBJECT }
    setDefaultEnv()
    envApply(ignisConfig)
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

  test('envApply - ui via ignisConfig', async () => {
    const ignisConfig = { ...UI_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/ui-obj.txt')
  })

  test('envApply - ui via process.env', async () => {
    const ignisConfig = {}
    setUiEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/ui-env.txt')
  })

  test('envApply - ui env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...UI_OBJECT }
    setUiEnv()
    envApply(ignisConfig)
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

  test('envApply - db via ignisConfig', async () => {
    const ignisConfig = { ...DB_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/db-obj.txt')
  })

  test('envApply - db via process.env', async () => {
    const ignisConfig = {}
    setDbEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/db-env.txt')
  })

  test('envApply - db env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...DB_OBJECT }
    setDbEnv()
    envApply(ignisConfig)
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

  test('envApply - forms via ignisConfig', async () => {
    const ignisConfig = { ...FORMS_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/forms-obj.txt')
  })

  test('envApply - forms via process.env', async () => {
    const ignisConfig = {}
    setFormsEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/forms-env.txt')
  })

  test('envApply - forms env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...FORMS_OBJECT }
    setFormsEnv()
    envApply(ignisConfig)
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

  test('envApply - validation via ignisConfig', async () => {
    const ignisConfig = { ...VALIDATION_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/validation-obj.txt')
  })

  test('envApply - validation via process.env', async () => {
    const ignisConfig = {}
    setValidationEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/validation-env.txt')
  })

  test('envApply - validation env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...VALIDATION_OBJECT }
    setValidationEnv()
    envApply(ignisConfig)
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

  test('envApply - content via ignisConfig', async () => {
    const ignisConfig = { ...CONTENT_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/content-obj.txt')
  })

  test('envApply - content via process.env', async () => {
    const ignisConfig = {}
    setContentEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/content-env.txt')
  })

  test('envApply - content env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...CONTENT_OBJECT }
    setContentEnv()
    envApply(ignisConfig)
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

  test('envApply - utils via ignisConfig', async () => {
    const ignisConfig = { ...UTILS_OBJECT }
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/utils-obj.txt')
  })

  test('envApply - utils via process.env', async () => {
    const ignisConfig = {}
    setUtilsEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/utils-env.txt')
  })

  test('envApply - utils env takes precedence over ignisConfig', async () => {
    const ignisConfig = { ...UTILS_OBJECT }
    setUtilsEnv()
    envApply(ignisConfig)
    await expect(ignisConfig).toMatchFileSnapshot('./env/utils-both.txt')
  })
})
