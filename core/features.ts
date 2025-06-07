import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { defu } from 'defu'
import OpenProps from 'open-props'
import tailwindcss from '@tailwindcss/vite'
import { log } from './utils/consola'
import { ignisTailwindcssFix } from './utils/tailwind'

const currentDir = dirname(fileURLToPath(import.meta.url))

export function setFeatures() {
  // list of optional extra features
  const extras = [] as string[]
  // list of Nuxt-related settings
  const nuxt = [] as string[]

  // object for optional config that will be merged with global Nuxt config
  // declared in nuxt.config.ts
  let nuxtConfig = {
    modules: [] as string[],
  }

  // 1. core modules
  // (included unless disabled)

  // https://nuxt.com/modules/eslint
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_ESLINT !== 'false') {
    nuxtConfig.modules.push('@nuxt/eslint')
  }

  // https://nuxt.com/modules/fonts
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_FONTS !== 'false') {
    nuxtConfig.modules.push('@nuxt/fonts')
  }

  // https://image.nuxt.com/
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_IMAGE !== 'false') {
    nuxtConfig.modules.push('@nuxt/image')
  }

  // https://pinia.vuejs.org/ssr/nuxt.html
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_PINIA !== 'false') {
    nuxtConfig.modules.push('@pinia/nuxt')
  }

  // https://scripts.nuxt.com/
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_SCRIPTS !== 'false') {
    nuxtConfig.modules.push('@nuxt/scripts')
  }

  // https://nuxt.com/modules/security
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_SECURITY !== 'false') {
    nuxtConfig.modules.push('nuxt-security')
  }

  // https://nuxt.com/modules/vueuse
  if (process.env.NUXT_PUBLIC_IGNIS_CORE_VUEUSE !== 'false') {
    nuxtConfig.modules.push('@vueuse/nuxt')
  }

  // 2. optional modules & features
  // (excluded unless enabled)

  // ui
  let uiPreset = process.env.NUXT_PUBLIC_IGNIS_PRESET_UI
  if (uiPreset && !['nuxt-ui', 'tailwind'].includes(uiPreset)) {
    // surpress other values
    process.env.NUXT_PUBLIC_IGNIS_PRESET_UI = uiPreset = 'off'
  }

  let tailwindFixRequired = false
  if (uiPreset === 'nuxt-ui' || process.env.NUXT_PUBLIC_IGNIS_UI === 'true') {
    tailwindFixRequired = true
    nuxtConfig.modules.push('@nuxt/ui')
    // import tailwind css file
    nuxtConfig = defu({
      css: [join(currentDir, './assets/css/nuxt-ui.css')],
    }, nuxtConfig)
  } else {
    // remove @nuxt/ui-specific components from resolution if module is not used
    nuxtConfig = defu({
      vue: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag === 'Icon' || tag === 'UApp',
        },
      },
    }, nuxtConfig)

    // evaluate separate Tailwind CSS module
    if (uiPreset === 'tailwind' || (process.env.NUXT_PUBLIC_IGNIS_TAILWIND === 'true' && uiPreset !== 'nuxt-ui')) {
      tailwindFixRequired = true
      // nuxtConfig.modules.push('@nuxtjs/tailwindcss') // temporary disabled until v7 is released
      extras.push('Tailwind CSS')
      // import tailwind css file
      nuxtConfig = defu({
        css: [join(currentDir, './assets/css/tailwind.css')],
        vite: {
          plugins: [tailwindcss()], // temporary integration using Vite plugin directly
        },
      }, nuxtConfig)
    }
  }

  // TODO occasionaly check https://github.com/tailwindlabs/tailwindcss/discussions/16119 for solution
  if (tailwindFixRequired) {
    nuxtConfig = defu({
      vite: {
        plugins: [ignisTailwindcssFix],
      },
    }, nuxtConfig)
  }

  // database
  let dbPreset = process.env.NUXT_PUBLIC_IGNIS_PRESET_DB
  if (dbPreset && !['neon', 'supabase'].includes(dbPreset)) {
    // surpress other values
    process.env.NUXT_PUBLIC_IGNIS_PRESET_DB = dbPreset = 'off'
  }

  if (dbPreset === 'neon' || process.env.NUXT_PUBLIC_IGNIS_NEON === 'true') {
    // module definition
    nuxtConfig.modules.push('nuxt-neon')
  }
  if (dbPreset === 'supabase' || process.env.NUXT_PUBLIC_IGNIS_SUPABASE === 'true') {
    // module definition
    nuxtConfig.modules.push('@nuxtjs/supabase')
    // module-specific config key
    nuxtConfig = defu({
      supabase: {
        redirect: false, // https://github.com/supabase/supabase/issues/16551#issuecomment-1685300935
      },
    }, nuxtConfig)
  }

  // i18n
  if (process.env.NUXT_PUBLIC_IGNIS_I18N_ENABLED === 'true') {
    // module definition
    nuxtConfig.modules.push('@nuxtjs/i18n')
    // module-specific config key
    nuxtConfig = defu({
      i18n: {
        vueI18n: process.env.NUXT_PUBLIC_IGNIS_I18N_CONFIG || './i18n.config.ts',
        // default to defined here because of the way of possibe initializing of @nuxtjs/seo module
        // TODO scanI18Names from './utils/i18n-sources' would be better, but import.meta.glob fails here...
        locales: [process.env.NUXT_PUBLIC_IGNIS_I18N_DEFAULT || 'en'],
        // avoid automatic route-prefixing with multiple locales
        // TODO this needs to be written in docs
        strategy: 'no_prefix',
        // will deprecate in v10
        bundle: {
          optimizeTranslationDirective: false,
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
    nuxtConfig.modules.push('@vueform/nuxt')
  }
  if (formsPreset === 'formkit' || process.env.NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED === 'true') {
    // module definition
    nuxtConfig.modules.push('@formkit/nuxt')
    // module-specific config key
    nuxtConfig = defu({
      formkit: {
        autoImport: true,
        configFile: process.env.NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG || './formkit.config.ts',
      },
    }, nuxtConfig)
  }

  // seo
  // 2025/04 - must be before @nuxt/content (https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content)
  if (process.env.NUXT_PUBLIC_IGNIS_SEO === 'true') {
    nuxtConfig.modules.push('@nuxtjs/seo')

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
    nuxtConfig.modules.push('@nuxt/content')
  }

  // nuxt-auth-utils
  if (process.env.NUXT_PUBLIC_IGNIS_AUTH === 'true') {
    nuxtConfig.modules.push('nuxt-auth-utils')
  }

  // Open Props CSS
  if (process.env.NUXT_PUBLIC_IGNIS_OPENPROPS === 'true') {
    extras.push('Open Props CSS')
    nuxtConfig = defu({
      // import Open Prpops stylesheet
      css: [join(currentDir, './assets/css/open-props.css')],
      // CSS processor for Open Props
      postcss: {
        plugins: {
          'postcss-jit-props': OpenProps,
        },
      },
    }, nuxtConfig)
  }

  // elrh-pslo
  if (process.env.NUXT_PUBLIC_IGNIS_PSLO_ENABLED === 'true') {
    extras.push('elrh-pslo')
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

  // 4. warn if duplicate modules find
  // this means e.g. 2 database modules or 2 form solutions
  if (process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES !== 'false') {
    const used = nuxtConfig.modules
    if (used.includes('nuxt-neon') && used.includes('@nuxtjs/supabase')) {
      log.warn('You have both DB connector modules (Neon and Supabase) active, which is not recommended. If this is intentional, you can use `process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES=false` to surpress this warning.')
    }
    if (used.includes('@vueform/nuxt') && used.includes('@formkit/nuxt')) {
      log.warn('You have both Form solution provider modules (Vueform and Formkit) active, which is not recommended. If this is intentional, you can use `process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES=false` to surpress this warning.')
    }
  }

  // 5. verify results
  // TODO why this run twice?

  let overview = 'Nuxt Ignis will start using following settings:\n'
  overview += 'Modules: ' + nuxtConfig.modules.join(', ') + '\n'
  if (extras.length > 0) {
    overview += 'Extras: ' + extras.join(', ') + '\n'
  }
  if (nuxt.length > 0) {
    overview += 'Nuxt: ' + nuxt.join(', ') + '\n'
  }
  log.info(overview)

  return nuxtConfig
}
