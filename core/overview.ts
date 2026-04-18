import type { IgnisOptions } from './modules/02-features'

// go through resolved Ignis config object (after all sub-modules run) and make
// a structured text summary of what will be used by current Nuxt Ignis instance
export function getIgnisFeaturesOverview(ignisConfig: Partial<IgnisOptions> | false | undefined) {
  if (ignisConfig === false) {
    console.info('Nuxt Ignis is disabled')
    return
  }

  if (ignisConfig === undefined) {
    console.warn('Failed to resolve Nuxt Ignis configuration (config object is undefined)')
    return
  }

  // list of modules loaded through Ignis sub-modules
  const modules = [] as string[]
  // list of optional extra features and settings
  const extras = [] as string[]
  // list of Nuxt-related settings
  const nuxt = [] as string[]

  // 01 - @nuxt-ignis/default
  const defaultConfig = ignisConfig.default
  if (defaultConfig) {
    // modules
    if (defaultConfig.eslint) {
      modules.push('@nuxt/eslint')
    }
    if (defaultConfig.fonts) {
      modules.push('@nuxt/fonts')
    }
    if (defaultConfig.image) {
      modules.push('@nuxt/image')
    }
    if (defaultConfig.scripts) {
      modules.push('@nuxt/scripts')
    }
    if (defaultConfig.security) {
      modules.push('nuxt-security')
    }
    if (defaultConfig.auth) {
      modules.push('nuxt-auth-utils')
    }
    if (defaultConfig.vueuse) {
      modules.push('@vueuse/nuxt')
    }
    if (defaultConfig.pinia) {
      modules.push('@pinia/nuxt')
    }
    // extras
    if (defaultConfig.css) {
      extras.push('Ignis CSS')
    }
  }

  // 02 - @nuxt-ignis/ui
  const uiConfig = ignisConfig.ui
  if (uiConfig) {
    // modules
    if (uiConfig.ui) {
      modules.push('@nuxt/ui')
    }
    if (uiConfig.charts) {
      modules.push('nuxt-charts')
    }
    // extras
    if (uiConfig.tailwind) {
      // currently not via a module
      extras.push('Tailwind CSS')
    }
    if (uiConfig.openprops) {
      // currently not via a module
      extras.push('Open Props CSS')
    }
  }

  // 03 - @nuxt-ignis/db
  const dbConfig = ignisConfig.db
  if (dbConfig) {
    // modules
    if (dbConfig.neon?.enabled) {
      modules.push('nuxt-neon')
    }
    if (dbConfig.supabase?.enabled) {
      modules.push('@nuxtjs/supabase')
    }
  }

  // 04 - @nuxt-ignis/forms
  const formsConfig = ignisConfig.forms
  if (formsConfig) {
    // modules
    if (formsConfig.vueform?.enabled) {
      modules.push('@vueform/nuxt')
    }
    if (formsConfig.formkit?.enabled) {
      modules.push('@formkit/nuxt')
    }
  }

  // 05 - @nuxt-ignis/validation
  const validationConfig = ignisConfig.validation
  if (validationConfig) {
    // extras
    if (validationConfig.zod) {
      extras.push('Zod')
    }
    if (validationConfig.valibot) {
      extras.push('Valibot')
    }
  }

  // 06 - @nuxt-ignis/content
  const contentConfig = ignisConfig.content
  if (contentConfig) {
    // modules
    if (contentConfig.content?.enabled) {
      modules.push('@nuxt/content')
    }
    if (contentConfig.i18n?.enabled) {
      modules.push('@nuxtjs/i18n')
    }
    if (contentConfig.seo?.enabled) {
      modules.push('@nuxtjs/seo')
    }
    if (contentConfig.social?.enabled) {
      modules.push('@stefanobartoletti/nuxt-social-share')
    }
    // extras
    if (contentConfig.pslo?.enabled) {
      extras.push('elrh-pslo')
    }
  }

  // 07 - @nuxt-ignis/utils
  const utilsConfig = ignisConfig.utils
  if (utilsConfig) {
    // modules
    if (utilsConfig.equipment?.enabled) {
      modules.push('@maas/vue-equipment/nuxt')
    }
    if (utilsConfig.regexp?.enabled) {
      modules.push('magic-regexp/nuxt')
    }
  }

  // extra settings in "config"

  const config = ignisConfig.config
  if (config) {
    // Nuxt settings
    if (config.nuxt?.ssr === false) {
      nuxt.push('ssr=false')
    }
    if (config.nuxt?.pages === false) {
      nuxt.push('pages=false')
    }
    if (config.nuxt?.css) {
      nuxt.push('Custom CSS')
    }
    // logging
    if (config.log?.level) {
      extras.push(`log-level=${config.log.level || 'info [default]'}`)
    }
  }

  // gather config info into a single formatted string
  const appTitle = ignisConfig.config?.html?.title || 'Nuxt Ignis App'
  let overview = `App title: ${appTitle}\n`

  if (modules.length > 0) {
    overview += `Modules: ${modules.join(', ')}\n`
  }

  if (extras.length > 0) {
    overview += `Extras: ${extras.join(', ')}\n`
  }

  if (nuxt.length > 0) {
    overview += `Nuxt: ${nuxt.join(', ')}\n`
  }

  // print the results
  console.info('Nuxt Ignis is starting with the following settings:\n' + overview)
}
