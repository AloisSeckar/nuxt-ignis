import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { defu } from 'defu'
import { log } from './app/utils/consola'
import type { NuxtConfig } from 'nuxt/schema'

const currentDir = dirname(fileURLToPath(import.meta.url))

// core function to determine effective config for the current Nuxt app instance
// custom settings are based on passed in environment variables
// and will be defu-merged with provided defaults
// printOverview = true is used in tests to capture console output
export function setFeatures(printOverview: boolean = false): { nuxtConfig: NuxtConfig, overview: string } {
  // list of optional extra features
  const extras = [] as string[]
  // list of Nuxt-related settings
  const nuxt = [] as string[]
  // list of modules loaded through Ignis utility modules
  const ignis = [] as string[]

  // object for optional config that will be merged with global Nuxt config
  // declared in nuxt.config.ts
  let nuxtConfig: NuxtConfig = {
    // make sure `nuxtConfig.modules` is always defined
    modules: [] as string[],
  }

  // 1. core modules
  // (included unless disabled)
  nuxtConfig.modules!.push('@nuxt-ignis/core')
  nuxtConfig = defu({
    ignisCore: {
      eslint: process.env.NUXT_PUBLIC_IGNIS_CORE_ESLINT !== 'false',
      fonts: process.env.NUXT_PUBLIC_IGNIS_CORE_FONTS !== 'false',
      image: process.env.NUXT_PUBLIC_IGNIS_CORE_IMAGE !== 'false',
      scripts: process.env.NUXT_PUBLIC_IGNIS_CORE_SCRIPTS !== 'false',
      security: process.env.NUXT_PUBLIC_IGNIS_CORE_SECURITY !== 'false',
      auth: process.env.NUXT_PUBLIC_IGNIS_CORE_AUTH !== 'false',
      vueuse: process.env.NUXT_PUBLIC_IGNIS_CORE_VUEUSE !== 'false',
      pinia: process.env.NUXT_PUBLIC_IGNIS_CORE_PINIA !== 'false',
    },
  }, nuxtConfig)

  // 2. optional modules & features
  // (excluded unless enabled)

  // ui
  let uiPreset = process.env.NUXT_PUBLIC_IGNIS_PRESET_UI
  if (uiPreset && !['nuxt-ui', 'tailwind'].includes(uiPreset)) {
    // surpress other values
    process.env.NUXT_PUBLIC_IGNIS_PRESET_UI = uiPreset = 'off'
  }

  if (uiPreset === 'nuxt-ui' || process.env.NUXT_PUBLIC_IGNIS_UI === 'true') {
    nuxtConfig.modules!.push('@nuxt-ignis/ui')
    ignis.push('@nuxt-ignis/ui/nuxt-ui')
    nuxtConfig = defu({
      ignisUI: {
        ui: true,
        cssDir: join(currentDir, './app/assets/css'),
      },
    }, nuxtConfig)
  } else {
    // remove @nuxt/ui-specific components from resolution if module is not used
    // must remain here because it should be removed even if @nuxt-ignis/ui is not invoked at all
    nuxtConfig = defu({
      vue: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag === 'Icon' || tag === 'UApp',
        },
      },
    }, nuxtConfig)

    // evaluate separate Tailwind CSS module
    if (uiPreset === 'tailwind' || (process.env.NUXT_PUBLIC_IGNIS_TAILWIND === 'true' && uiPreset !== 'nuxt-ui')) {
      nuxtConfig.modules!.push('@nuxt-ignis/ui')
      ignis.push('@nuxt-ignis/ui/tailwind')
      nuxtConfig = defu({
        ignisUI: {
          tailwind: true,
          cssDir: join(currentDir, './app/assets/css'),
        },
      }, nuxtConfig)
    }
  }

  // database
  let dbPreset = process.env.NUXT_PUBLIC_IGNIS_PRESET_DB
  if (dbPreset && !['neon', 'supabase'].includes(dbPreset)) {
    // surpress other values
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = dbPreset = 'off'
  }

  if (dbPreset === 'neon' || process.env.NUXT_PUBLIC_IGNIS_NEON === 'true') {
    nuxtConfig.modules!.push('@nuxt-ignis/db')
    ignis.push('@nuxt-ignis/db/neon')
    nuxtConfig = defu({
      ignisDB: {
        neon: true,
      },
    }, nuxtConfig)
  }
  if (dbPreset === 'supabase' || process.env.NUXT_PUBLIC_IGNIS_SUPABASE === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/db')) {
      nuxtConfig.modules!.push('@nuxt-ignis/db')
    }
    ignis.push('@nuxt-ignis/db/supabase')
    nuxtConfig = defu({
      ignisDB: {
        supabase: true,
      },
    }, nuxtConfig)
  }

  // i18n
  if (process.env.NUXT_PUBLIC_IGNIS_I18N_ENABLED === 'true') {
    nuxtConfig.modules!.push('@nuxt-ignis/content')
    ignis.push('@nuxt-ignis/content/i18n')
    nuxtConfig = defu({
      ignisContent: {
        i18n: {
          enabled: true,
          default: process.env.NUXT_PUBLIC_IGNIS_I18N_DEFAULT || 'en',
          config: process.env.NUXT_PUBLIC_IGNIS_I18N_CONFIG || './i18n.config.ts',
        },
      },
    }, nuxtConfig)
  }

  // forms
  let formsPreset = process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS
  if (formsPreset && !['vueform', 'formkit'].includes(formsPreset)) {
    // surpress other values
    process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS = formsPreset = 'off'
  }

  if (formsPreset === 'vueform' || process.env.NUXT_PUBLIC_IGNIS_VUEFORM === 'true') {
    nuxtConfig.modules!.push('@nuxt-ignis/forms')
    ignis.push('@nuxt-ignis/forms/vueform')
    nuxtConfig = defu({
      ignisForms: {
        vueform: true,
      },
    }, nuxtConfig)
  }
  if (formsPreset === 'formkit' || process.env.NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/forms')) {
      nuxtConfig.modules!.push('@nuxt-ignis/forms')
    }
    ignis.push('@nuxt-ignis/forms/formkit')
    nuxtConfig = defu({
      ignisForms: {
        formkit: {
          enabled: true,
          default: process.env.NUXT_PUBLIC_IGNIS_FORMKIT_DEFAULT || 'en',
          config: process.env.NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG || './formkit.config.ts',
        },
      },
    }, nuxtConfig)
  }

  // validation
  let validationPreset = process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION
  if (validationPreset && !['zod', 'valibot'].includes(validationPreset)) {
    // surpress other values
    process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION = validationPreset = 'off'
  }
  if (validationPreset === 'zod' || process.env.NUXT_PUBLIC_IGNIS_ZOD === 'true') {
    nuxtConfig.modules!.push('@nuxt-ignis/validation')
    ignis.push('@nuxt-ignis/validation/zod')
    nuxtConfig = defu({
      ignisValidation: {
        zod: true,
      },
    }, nuxtConfig)
  }
  if (validationPreset === 'valibot' || process.env.NUXT_PUBLIC_IGNIS_VALIBOT === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/validation')) {
      nuxtConfig.modules!.push('@nuxt-ignis/validation')
    }
    ignis.push('@nuxt-ignis/validation/valibot')
    nuxtConfig = defu({
      ignisValidation: {
        valibot: true,
      },
    }, nuxtConfig)
  }

  // seo
  // 2025/04 - must be before @nuxt/content (https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content)
  if (process.env.NUXT_PUBLIC_IGNIS_SEO === 'true') {
    nuxtConfig.modules!.push('@nuxtjs/seo')

    // ogImage and Schema.org modules should be disabled with `ssr: false`
    // note: this won't work if `ssr: false` is set in target's project nuxt.config.ts
    if (process.env.NUXT_PUBLIC_IGNIS_SSR === 'false') {
      nuxtConfig = defu({
        ogImage: { enabled: false },
        schemaOrg: { enabled: false },
      }, nuxtConfig)
    }
  }

  // content
  if (process.env.NUXT_PUBLIC_IGNIS_CONTENT === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/content')) {
      nuxtConfig.modules!.push('@nuxt-ignis/content')
    }
    nuxtConfig = defu({
      ignisContent: {
        content: {
          enabled: true,
        },
      },
    }, nuxtConfig)
  }

  // social share
  if (process.env.NUXT_PUBLIC_IGNIS_SOCIAL_ENABLED === 'true') {
    nuxtConfig.modules!.push('@stefanobartoletti/nuxt-social-share')
    nuxtConfig = defu({
      socialShare: {
        baseUrl: process.env.NUXT_PUBLIC_IGNIS_SOCIAL_URL || 'https://nuxt-ignis.com/',
      },
    }, nuxtConfig)
    if (!process.env.NUXT_PUBLIC_IGNIS_SOCIAL_URL) {
      log.warn('Base URL for `nuxt-social-share` is not set. Use `process.env.NUXT_PUBLIC_IGNIS_SOCIAL_URL` to point sharing to your domain correctly.')
    }
  }

  // https://www.vue.equipment/
  if (process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED === 'true') {
    nuxtConfig.modules!.push('@nuxt-ignis/utils')
    ignis.push('@nuxt-ignis/utils/equipment')
    const equipmentConfig: Record<string, unknown> = { enabled: true }
    if (process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES) {
      equipmentConfig.composables = process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES.split(',').map(p => p?.trim())
    }
    if (process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS) {
      equipmentConfig.plugins = process.env.NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS.split(',').map(p => p?.trim())
    }
    nuxtConfig = defu({
      ignisUtils: {
        equipment: equipmentConfig,
      },
    }, nuxtConfig)
  }

  // Open Props CSS
  if (process.env.NUXT_PUBLIC_IGNIS_OPENPROPS === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/ui')) {
      nuxtConfig.modules!.push('@nuxt-ignis/ui')
    }
    ignis.push('@nuxt-ignis/ui/openprops')
    nuxtConfig = defu({
      ignisUI: {
        openprops: true,
        cssDir: join(currentDir, './app/assets/css'),
      },
    }, nuxtConfig)
  }

  // elrh-pslo
  if (process.env.NUXT_PUBLIC_IGNIS_PSLO_ENABLED === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/content')) {
      nuxtConfig.modules!.push('@nuxt-ignis/content')
    }
    ignis.push('@nuxt-ignis/content/pslo')
    nuxtConfig = defu({
      ignisContent: {
        pslo: {
          enabled: true,
          content: process.env.NUXT_PUBLIC_IGNIS_PSLO_CONTENT === 'true',
        },
      },
    }, nuxtConfig)
  }

  // magic-regexp
  if (process.env.NUXT_PUBLIC_IGNIS_REGEXP === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/utils')) {
      nuxtConfig.modules!.push('@nuxt-ignis/utils')
    }
    ignis.push('@nuxt-ignis/utils/regexp')
    nuxtConfig = defu({
      ignisUtils: {
        regexp: true,
      },
    }, nuxtConfig)
  }

  // nuxt-charts
  if (process.env.NUXT_PUBLIC_IGNIS_CHARTS === 'true') {
    if (!nuxtConfig.modules!.includes('@nuxt-ignis/ui')) {
      nuxtConfig.modules!.push('@nuxt-ignis/ui')
    }
    ignis.push('@nuxt-ignis/ui/charts')
    nuxtConfig = defu({
      ignisUI: {
        charts: true,
      },
    }, nuxtConfig)
  }

  // 3. Nuxt-related settings

  nuxt.push(`log-level=${process.env.NUXT_PUBLIC_IGNIS_LOG_LEVEL || 'info[default]'}`)

  if (process.env.NUXT_PUBLIC_IGNIS_SSR === 'false') {
    nuxtConfig = defu({
      ssr: false,
    }, nuxtConfig)
    nuxt.push('ssr=false')
  }

  if (process.env.NUXT_PUBLIC_IGNIS_PAGES === 'false') {
    nuxtConfig = defu({
      pages: false,
    }, nuxtConfig)
    nuxt.push('pages=false')
  }

  // default CSS file
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_CSS !== 'false') {
    nuxtConfig = defu({
      css: [join(currentDir, './app/assets/css/ignis.css')],
    }, nuxtConfig)
    nuxt.push('ignis CSS')
  }

  // custom CSS files
  if (process.env.NUXT_PUBLIC_IGNIS_CSS) {
    // values MUST be delimited by "," (spaces will be trimmed)
    nuxtConfig = defu({
      css: process.env.NUXT_PUBLIC_IGNIS_CSS.split(',').map(p => p?.trim()),
    }, nuxtConfig)
    nuxt.push('custom CSS')
  }

  // 4. HTML config
  const htmlLang = process.env.NUXT_PUBLIC_IGNIS_HTML_LANG || 'en'
  const appTitle = process.env.NUXT_PUBLIC_IGNIS_HTML_TITLE || 'Nuxt Ignis App'
  nuxtConfig = defu({
    app: {
      head: {
        htmlAttrs: {
          lang: htmlLang,
        },
        title: appTitle,
      },
    },
  }, nuxtConfig)

  // 5. warn if duplicate modules find
  // this means e.g. 2 database modules or 2 form solutions
  if (process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES !== 'false') {
    if (ignis.includes('@nuxt-ignis/db/neon') && ignis.includes('@nuxt-ignis/db/supabase')) {
      log.warn('You have both DB connector modules (Neon and Supabase) active, which is not recommended. If this is intentional, you can use `process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES=false` to surpress this warning.')
    }
    if (ignis.includes('@nuxt-ignis/forms/vueform') && ignis.includes('@nuxt-ignis/forms/formkit')) {
      log.warn('You have both Form solution provider modules (Vueform and Formkit) active, which is not recommended. If this is intentional, you can use `process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES=false` to surpress this warning.')
    }
    if (ignis.includes('@nuxt-ignis/validation/zod') && ignis.includes('@nuxt-ignis/validation/valibot')) {
      log.warn('You have both validation libraries (Zod and Valibot) active, which is not recommended. If this is intentional, you can use `process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES=false` to surpress this warning.')
    }
  }

  // 6. verify results
  // return as string to be logged in 'schema:resolved' hook (to prevent multiple logs)
  let overview = `App title: ${appTitle}\n`
  overview += `Modules: ${nuxtConfig.modules!.join(', ')}\n`
  if (ignis.length > 0) {
    overview += `Modules (Ignis): ${ignis.join(', ')}\n`
  }
  if (extras.length > 0) {
    overview += `Extras: ${extras.join(', ')}\n`
  }
  if (nuxt.length > 0) {
    overview += `Nuxt: ${nuxt.join(', ')}\n`
  }

  // used in tests to capture console output
  if (printOverview) {
    log.info('Nuxt Ignis will start using following settings:\n' + overview)
  }

  return {
    nuxtConfig,
    overview,
  }
}
