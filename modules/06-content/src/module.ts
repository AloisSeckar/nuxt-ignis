import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { ignisModuleDependencies, ignisModuleSetup } from './ignisContentSetup'
import type { NuxtOptions } from 'nuxt/schema'
import type { ModuleOptions as NuxtContentModuleOptions } from '@nuxt/content'

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
    staticsite?: boolean
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
    // TODO temp workaround for seo+ssr config
    config?: {
      nuxt?: {
        ssr?: boolean
      }
    }
  }
}

type NuxtContentOptions = NuxtOptions & {
  content?: Partial<NuxtContentModuleOptions>
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
    const resolver = createResolver(import.meta.url)

    ignisModuleSetup(nuxt.options as NuxtIgnisContentOptions, nuxt)

    // pslo content hook (requires nuxt instance)
    const runtimeConfig = nuxt.options.runtimeConfig.public as { ignis?: { content?: IgnisContentOptions } }
    const effectiveOptions = runtimeConfig.ignis?.content
    if (effectiveOptions?.pslo?.enabled === true
      && effectiveOptions?.content?.enabled === true
      && effectiveOptions?.pslo?.content === true) {
      // integration with Nuxt Content
      // if enabled, all Nuxt Content page data will be treated with "preventSingleLetterOrphans" function

      // transformation hook to apply the changes
      nuxt.hook('content:file:beforeParse', async (ctx: { file: { id: string, body: string } }) => {
        const { preventSingleLetterOrphans } = await import('elrh-pslo')
        const { file } = ctx
        file.body = preventSingleLetterOrphans(file.body)
        console.debug(`Nuxt Content file ${file.id} processed with elrh-pslo`)
      })

      // fix to force Nuxt Content to invalidate its cache
      // otherwise the hook won't be applied for the first time
      // and we would have to manually delete cached files
      const options = nuxt.options as NuxtContentOptions
      options.content ??= {}
      options.content.build ??= {}
      options.content.build.markdown ??= {}
      const markdown = options.content.build.markdown as Record<string, unknown>
      markdown.__ignisPsloContent = true
    }

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
