import { createResolver } from '@nuxt/kit'
import { defu } from 'defu'
import OpenProps from 'open-props'
import tailwindcss from '@tailwindcss/vite'
import { ignisTailwindFix } from './runtime/tailwind-fix'
import { ignisTailwindSource } from './runtime/tailwind-source'
import type { IgnisUIOptions, NuxtIgnisUIOptions } from './module'
import type { PublicRuntimeConfig, RuntimeConfig } from 'nuxt/schema'

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisUIOptions) {
  console.debug('@nuxt-ignis/ui - module dependencies are being resolved')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  const options = nuxtOptions.ignis?.ui

  // https://nuxt.com/modules/ui
  if (options?.ui === true) {
    modules['@nuxt/ui'] = { }
    console.debug('@nuxt/ui module installed')
  }

  // Tailwind CSS - is temporarily integrated using a Vite plugin (in setup)
  // TODO https://github.com/AloisSeckar/nuxt-ignis/issues/75

  // Open Props - is integrated using PostCSS plugin (in setup)

  // Nuxt Charts
  if (options?.charts === true) {
    modules['nuxt-charts'] = { }
    console.debug('nuxt-charts module installed')
  }

  return modules
}

export function ignisModuleSetup(nuxtOptions: NuxtIgnisUIOptions) {
  console.debug('@nuxt-ignis/ui - module setup function runs')

  const options = nuxtOptions.ignis?.ui

  // inject runtime config values
  nuxtOptions.runtimeConfig ||= {
    public: {} as PublicRuntimeConfig,
  } as RuntimeConfig

  const runtimeConfig = nuxtOptions.runtimeConfig.public as { ignis?: { ui?: IgnisUIOptions } }
  runtimeConfig.ignis ??= {}
  runtimeConfig.ignis.ui ??= {}
  runtimeConfig.ignis.ui.ui ??= options?.ui ?? false
  runtimeConfig.ignis.ui.tailwind ??= options?.tailwind ?? false
  runtimeConfig.ignis.ui.openprops ??= options?.openprops ?? false
  runtimeConfig.ignis.ui.charts ??= options?.charts ?? false

  // additional processing
  const effectiveOptions = runtimeConfig.ignis.ui

  const resolver = createResolver(import.meta.url)

  let tailwindIncluded = false

  if (effectiveOptions.ui === true) {
    tailwindIncluded = true
    // import tailwind css file
    nuxtOptions.css ||= []
    nuxtOptions.css.push(resolver.resolve('./runtime/css/ignis-nuxt-ui.css'))
    console.debug('Nuxt UI CSS file included')
  }
  else if (effectiveOptions.tailwind === true) {
    tailwindIncluded = true
    // import tailwind css file
    nuxtOptions.css ||= []
    nuxtOptions.css.push(resolver.resolve('./runtime/css/ignis-tailwind.css'))
    // temporary integration using Vite plugin directly
    nuxtOptions.vite = defu({
      plugins: [tailwindcss()],
    }, nuxtOptions.vite)
    console.debug('Tailwind CSS file included')
  }

  if (tailwindIncluded) {
    // rewrite `@import "tailwindcss"` in shipped CSS to point Tailwind's source
    // detection at the consumer project's rootDir (otherwise it scans inside
    // the published @nuxt-ignis/ui module and misses files like content/**/*.md)
    nuxtOptions.vite = defu({
      plugins: [
        // add explict path to Tailwind CSS sources into @import statement
        ignisTailwindSource(nuxtOptions.rootDir),
        // temporary fix to surpress irrelevant warnings on startup
        // TODO occasionaly check https://github.com/tailwindlabs/tailwindcss/discussions/16119 for solution
        ignisTailwindFix(),
      ],
    }, nuxtOptions.vite)
  }

  // Open Props CSS
  if (options?.openprops === true) {
    // import Open Props CSS file
    nuxtOptions.css ||= []
    nuxtOptions.css.push(resolver.resolve('./runtime/css/ignis-open-props.css'))
    // add plugin for processing
    nuxtOptions.postcss = defu({
      plugins: {
        'postcss-jit-props': OpenProps,
      },
    }, nuxtOptions.postcss)
    console.debug('Open Props CSS enabled')
  }
}
