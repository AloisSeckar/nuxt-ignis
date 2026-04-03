import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { log, ignisModuleDependencies, ignisModuleSetup } from './ignisContentSetup'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisContentOptions {
  content?: {
    enabled?: boolean
  }
  i18n?: {
    enabled?: boolean
    default?: string
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

export type NuxtIgnisContentOptions = NuxtOptions & {
  ignis: {
    content?: IgnisContentOptions
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
    return ignisModuleDependencies(nuxt.options as NuxtIgnisContentOptions)
  },
  setup(_options, nuxt) {
    ignisModuleSetup(nuxt.options as NuxtIgnisContentOptions)

    // pslo content hook (requires nuxt instance)
    const runtimeConfig = nuxt.options.runtimeConfig.public as { ignis?: { content?: IgnisContentOptions } }
    const effectiveOptions = runtimeConfig.ignis?.content
    if (effectiveOptions?.pslo?.enabled === true
      && effectiveOptions?.content?.enabled === true
      && effectiveOptions?.pslo?.content === true) {
      // integration with Nuxt Content
      // if enabled, all Nuxt Content page data will be treated with "preventSingleLetterOrphans" function
      // @ts-expect-error the hook will resolve correctly at runtime
      nuxt.hook('content:file:beforeParse', async (ctx: { file: { id: string, body: string } }) => {
        const { preventSingleLetterOrphans } = await import('elrh-pslo')
        const { file } = ctx
        file.body = preventSingleLetterOrphans(file.body)
        log.debug(`Nuxt Content file ${file.id} processed with elrh-pslo`)
      })
    }

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
