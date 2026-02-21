import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
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

export default defineNuxtModule<IgnisContentOptions>({
  meta: {
    name: '@nuxt-ignis/content',
    configKey: 'ignisContent',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/content - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: { content?: IgnisContentOptions } }
    const options = nuxtOpts.ignisContent || nuxtOpts.ignis?.content

    // I18N
    if (options?.i18n?.enabled) {
      modules['@nuxtjs/i18n'] = {
        vueI18n: options.i18n?.config || './i18n.config.ts',
        locales: [options.i18n?.default || 'en'],
        strategy: 'no_prefix',
        bundle: {
          optimizeTranslationDirective: false,
        },
      }
      console.debug('@nuxtjs/i18n module installed')
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

      modules['@nuxtjs/seo'] = seoConfig

      console.debug('@nuxtjs/seo module installed')
    }

    // Nuxt Content
    if (options?.content?.enabled === true) {
      modules['@nuxt/content'] = { }
      console.debug('@nuxt/content module installed')
    }

    // Social Share
    if (options?.social?.enabled === true) {
      modules['@stefanobartoletti/nuxt-social-share'] = {
        baseUrl: options.social?.url || 'https://nuxt-ignis.com/',
      }
      if (!options.social?.url) {
        log.warn('Base URL for `nuxt-social-share` is not set. Use `process.env.NUXT_PUBLIC_IGNIS_SOCIAL_URL` to point sharing to your domain correctly.')
      }
      console.debug('@stefanobartoletti/nuxt-social-share module installed')
    }

    return modules
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.ignis ||= {
      content: { enabled: false },
      i18n: { enabled: false, default: 'en', config: './i18n.config.ts' },
      seo: { enabled: false },
      social: { enabled: false, url: '' },
      pslo: { enabled: false, content: false },
    }

    nuxt.options.runtimeConfig.public.ignis.content = {
      enabled: options.content?.enabled || false,
    }
    nuxt.options.runtimeConfig.public.ignis.i18n = {
      enabled: options.i18n?.enabled || false,
      default: options.i18n?.default || 'en',
      config: options.i18n?.config || './i18n.config.ts',
    }
    nuxt.options.runtimeConfig.public.ignis.seo = {
      enabled: options.seo?.enabled || false,
    }
    nuxt.options.runtimeConfig.public.ignis.social = {
      enabled: options.social?.enabled || false,
      url: options.social?.url || '',
    }
    nuxt.options.runtimeConfig.public.ignis.pslo = {
      enabled: options.pslo?.enabled || false,
      content: options.pslo?.content || false,
    }

    // elrh-pslo
    if (options.pslo?.enabled === true) {
      console.debug('elrh-pslo enabled')

      // integration with Nuxt Content
      // if enabled, all Nuxt Content page data will be treated with "preventSingleLetterOrphans" function
      if (options.content?.enabled === true && options.pslo?.content === true) {
        // @ts-expect-error the hook will resolve correctly at runtime
        nuxt.hook('content:file:beforeParse', async (ctx: { file: { id: string, body: string } }) => {
          const { preventSingleLetterOrphans } = await import('elrh-pslo')
          const { file } = ctx
          file.body = preventSingleLetterOrphans(file.body)
          log.debug(`Nuxt Content file ${file.id} processed with elrh-pslo`)
        })
      }
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
