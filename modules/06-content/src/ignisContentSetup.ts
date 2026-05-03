import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { addTemplate } from '@nuxt/kit'
// import { createConsola } from 'consola'
import type { IgnisContentOptions, NuxtIgnisContentOptions } from './module'
import type { PublicRuntimeConfig, RuntimeConfig } from 'nuxt/schema'

// export const log = createConsola({ defaults: { tag: 'nuxt-ignis' } })

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisContentOptions) {
  console.debug('@nuxt-ignis/content - module dependencies are being resolved')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  const options = nuxtOptions.ignis?.content

  // I18N
  if (options?.i18n?.enabled) {
    // scan locale files now so @nuxtjs/i18n has them when it initializes
    const localesDir = join(nuxtOptions.rootDir, 'i18n', 'locales')
    let localeFiles: string[] = []
    try {
      localeFiles = readdirSync(localesDir).filter(f => f.endsWith('.json'))
    }
    catch {
      console.warn(`No i18n locale files found in ${localesDir}`)
    }
    const localeCodes = localeFiles.map(f => f.replace('.json', ''))

    // pass config via `defaults` — moduleDependencies merges this into nuxt.options.i18n
    modules['@nuxtjs/i18n'] = {
      defaults: {
        locales: localeCodes.map(code => ({ code: code, file: `${code}.json` })),
        defaultLocale: options.i18n?.default || 'en',
      },
    }
    console.debug(`@nuxtjs/i18n module installed with locales: ${localeCodes.join(', ') || 'none'}`)
  }

  // SEO
  // module must be installed before @nuxt/content
  // (https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content)
  if (options?.seo?.enabled === true) {
    const seoConfig: Record<string, unknown> = {}

    // ogImage and Schema.org modules should be disabled with `ssr: false`
    if (nuxtOptions.ignis?.config?.nuxt?.ssr === false) {
      seoConfig.ogImage = { enabled: false }
      seoConfig.schemaOrg = { enabled: false }
    }

    modules['@nuxtjs/seo'] = {
      defaults: seoConfig,
    }

    console.debug('@nuxtjs/seo module installed')
  }

  // Nuxt Content
  if (options?.content?.enabled === true) {
    modules['@nuxt/content'] = {
      defaults: {
        experimental: {
          sqliteConnector: 'native',
        },
      },
    }
    console.debug('@nuxt/content module installed')
  }

  // Social Share
  if (options?.social?.enabled === true) {
    modules['@stefanobartoletti/nuxt-social-share'] = {
      defaults: {
        baseUrl: options.social?.url || '',
      },
    }
    console.debug('@stefanobartoletti/nuxt-social-share module installed')
  }

  return modules
}

export function ignisModuleSetup(nuxtOptions: NuxtIgnisContentOptions, runtimeDir: string) {
  console.debug('@nuxt-ignis/content - module setup function runs')

  const options = nuxtOptions.ignis?.content

  // inject runtime config values
  nuxtOptions.runtimeConfig ||= {
    public: {} as PublicRuntimeConfig,
  } as RuntimeConfig

  const runtimeConfig = nuxtOptions.runtimeConfig.public as { ignis?: { content?: IgnisContentOptions } }
  runtimeConfig.ignis ??= {}
  runtimeConfig.ignis.content ??= {}
  runtimeConfig.ignis.content.content ??= {}
  runtimeConfig.ignis.content.content.enabled ??= options?.content?.enabled ?? false
  runtimeConfig.ignis.content.i18n ??= {}
  runtimeConfig.ignis.content.i18n.enabled ??= options?.i18n?.enabled ?? false
  runtimeConfig.ignis.content.i18n.default ??= options?.i18n?.default ?? 'en'
  runtimeConfig.ignis.content.seo ??= {}
  runtimeConfig.ignis.content.seo.enabled ??= options?.seo?.enabled ?? false
  runtimeConfig.ignis.content.social ??= {}
  runtimeConfig.ignis.content.social.enabled ??= options?.social?.enabled ?? false
  runtimeConfig.ignis.content.social.url ??= options?.social?.url ?? ''
  runtimeConfig.ignis.content.pslo ??= {}
  runtimeConfig.ignis.content.pslo.enabled ??= options?.pslo?.enabled ?? false
  runtimeConfig.ignis.content.pslo.content ??= options?.pslo?.content ?? false

  // additional processing
  const effectiveOptions = runtimeConfig.ignis.content

  // register alias so users can import load functions in their custom `content.config.ts`
  nuxtOptions.alias ??= {}
  nuxtOptions.alias['#ignis-content/content-config'] = join(runtimeDir, 'content-config')

  // i18n
  if (effectiveOptions.i18n?.enabled === true) {
    // scan user's i18n/locales/*.json at build time and generate static imports
    const localesDir = join(nuxtOptions.rootDir, 'i18n', 'locales')
    let localeFiles: string[] = []
    try {
      localeFiles = readdirSync(localesDir).filter(f => f.endsWith('.json'))
    }
    catch {
      console.warn(`No i18n locale files found in ${localesDir}`)
    }

    const localeCodes = localeFiles.map(f => f.replace('.json', ''))

    // generate a build-time template with JSON imports
    // uses relative paths from .nuxt/ for cross-platform compatibility
    const buildDir = nuxtOptions.buildDir
    const template = addTemplate({
      filename: 'ignis-i18n-locales.mjs',
      write: true,
      getContents: () => {
        const imports = localeFiles.map((file) => {
          const code = file.replace('.json', '')
          const absPath = join(localesDir, file)
          let relPath = relative(buildDir, absPath).replace(/\\/g, '/')
          if (!relPath.startsWith('.')) {
            relPath = './' + relPath
          }
          return `import ${code} from '${relPath}' with { type: 'json' }`
        })
        return [
          '// Auto-generated by @nuxt-ignis/content',
          ...imports,
          '',
          `export const localeMessages = { ${localeCodes.join(', ')} }`,
          `export const localeNames = [${localeCodes.map(c => `{ code: '${c}', file: '${c}.json' }`).join(', ')}]`,
          '',
        ].join('\n')
      },
    })

    // register alias for both Nuxt app and Nitro server
    nuxtOptions.alias ??= {}
    nuxtOptions.alias['#ignis-i18n-locales'] = template.dst
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nitro = ((nuxtOptions as any).nitro ??= {})
    nitro.alias ??= {}
    nitro.alias['#ignis-i18n-locales'] = template.dst

    // @ts-expect-error 'i18n' option will exist at this point
    console.debug(`i18n enabled with default locale: ${effectiveOptions.i18n?.default}, ${nuxtOptions.i18n?.defaultLocale}`)
    console.debug(`i18n locale files found: ${localeCodes.join(', ') || 'none'}`)
  }

  // elrh-pslo
  if (effectiveOptions.pslo?.enabled === true) {
    console.debug('elrh-pslo enabled')
  }

  if (effectiveOptions.social?.enabled === true) {
    // @ts-expect-error 'socialShare' option will exist at this point
    if (!nuxtOptions.socialShare?.baseUrl && !effectiveOptions.social?.url) {
      console.warn('Base URL for `nuxt-social-share` is not set. Check https://nuxt-ignis.com/3-7-features-utils.html#nuxt-social-share to set it up correctly.')
    }
  }
}
