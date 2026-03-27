import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import { defineNuxtModule, addTemplate, addPlugin, createResolver } from '@nuxt/kit'
import { createConsola } from 'consola'
import type { NuxtOptions } from 'nuxt/schema'

const log = createConsola({ defaults: { tag: 'nuxt-ignis' } })

export interface IgnisContentOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  content?: {
    enabled?: boolean
  }
  i18n?: {
    enabled?: boolean
    default?: string
    config?: string
  }
  seo?: {
    enabled?: boolean
    ssr?: boolean
  }
  social?: {
    enabled?: boolean
    url?: string
  }
  pslo?: {
    enabled?: boolean
    content?: boolean
  }
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    content?: IgnisContentOptions
  }
}

export default defineNuxtModule<IgnisContentOptions>({
  meta: {
    name: '@nuxt-ignis/content',
  },
  moduleDependencies(nuxt) {
    console.log('@nuxt-ignis/content - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { content?: IgnisContentOptions } }
    const options = nuxtOpts.ignis?.content

    // I18N
    if (options?.i18n?.enabled) {
      // scan locale files now so @nuxtjs/i18n has them when it initializes
      const localesDir = join(nuxt.options.rootDir, 'i18n', 'locales')
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
      console.log('@nuxtjs/i18n module installed with locales:', localeCodes.join(', ') || 'none')
    }

    // SEO
    // module must be installed before @nuxt/content
    // (https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content)
    if (options?.seo?.enabled === true) {
      const seoConfig: Record<string, unknown> = {}

      // ogImage and Schema.org modules should be disabled with `ssr: false`
      if (options.seo.ssr === false) {
        seoConfig.ogImage = { enabled: false }
        seoConfig.schemaOrg = { enabled: false }
      }

      modules['@nuxtjs/seo'] = {
        defaults: seoConfig,
      }

      console.log('@nuxtjs/seo module installed')
    }

    // Nuxt Content
    if (options?.content?.enabled === true) {
      modules['@nuxt/content'] = { }
      console.log('@nuxt/content module installed')
    }

    // Social Share
    if (options?.social?.enabled === true) {
      modules['@stefanobartoletti/nuxt-social-share'] = {
        defaults: {
          baseUrl: options.social?.url || '',
        },
      }
      console.log('@stefanobartoletti/nuxt-social-share module installed')
    }

    return modules
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { content?: IgnisContentOptions } }
    const options = nuxtOpts.ignis?.content

    // inject runtime config values
    nuxt.options.runtimeConfig.public.ignis ||= {}
    nuxt.options.runtimeConfig.public.ignis.content ||= {
      content: {
        enabled: options?.content?.enabled || false,
      },
      i18n: {
        enabled: options?.i18n?.enabled || false,
        default: options?.i18n?.default || 'en',
        config: options?.i18n?.config || resolver.resolve('./i18n.config.ts'),
      },
      seo: {
        enabled: options?.seo?.enabled || false,
      },
      social: {
        enabled: options?.social?.enabled || false,
        url: options?.social?.url || '',
      },
      pslo: {
        enabled: options?.pslo?.enabled || false,
        content: options?.pslo?.content || false,
      },
    }

    // i18n
    if (options?.i18n?.enabled === true) {
      // scan user's i18n/locales/*.json at build time and generate static imports
      const localesDir = join(nuxt.options.rootDir, 'i18n', 'locales')
      let localeFiles: string[] = []
      try {
        localeFiles = readdirSync(localesDir).filter(f => f.endsWith('.json'))
      }
      catch {
        log.warn(`No i18n locale files found in ${localesDir}`)
      }

      const localeCodes = localeFiles.map(f => f.replace('.json', ''))

      // generate a build-time template with JSON imports
      // uses relative paths from .nuxt/ for cross-platform compatibility
      const buildDir = nuxt.options.buildDir
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
      nuxt.options.alias ||= {}
      nuxt.options.alias['#ignis-i18n-locales'] = template.dst
      nuxt.options.nitro ||= {}
      nuxt.options.nitro.alias ||= {}
      nuxt.options.nitro.alias['#ignis-i18n-locales'] = template.dst

      // @ts-expect-error 'i18n' option will exist at this point
      console.log('i18n enabled with default locale:', options?.i18n?.default, nuxt.options.i18n?.defaultLocale)
      console.log('i18n locale files found:', localeCodes.join(', ') || 'none')
    }

    // elrh-pslo
    if (options?.pslo?.enabled === true) {
      console.debug('elrh-pslo enabled')

      // integration with Nuxt Content
      // if enabled, all Nuxt Content page data will be treated with "preventSingleLetterOrphans" function
      if (options?.content?.enabled === true && options?.pslo?.content === true) {
        // @ts-expect-error the hook will resolve correctly at runtime
        nuxt.hook('content:file:beforeParse', async (ctx: { file: { id: string, body: string } }) => {
          const { preventSingleLetterOrphans } = await import('elrh-pslo')
          const { file } = ctx
          file.body = preventSingleLetterOrphans(file.body)
          log.debug(`Nuxt Content file ${file.id} processed with elrh-pslo`)
        })
      }
    }

    if (options?.social?.enabled === true) {
      // @ts-expect-error 'socialShare' option will exist at this point
      if (!nuxt.options.socialShare?.baseUrl && !options?.social?.url) {
        log.warn('Base URL for `nuxt-social-share` is not set. Check https://nuxt-ignis.com/3-7-features-utils.html#nuxt-social-share to set it up correctly.')
      }
    }

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
