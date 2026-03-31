import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { defu } from 'defu'
import OpenProps from 'open-props'
import tailwindcss from '@tailwindcss/vite'
import { ignisTailwindcssFix } from './runtime/tailwind'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisUIOptions {
  ui?: boolean
  tailwind?: boolean
  openprops?: boolean
  charts?: boolean
}

declare module 'nuxt/schema' {
  interface IgnisPublicRuntimeConfig {
    ui?: IgnisUIOptions
  }
}

export default defineNuxtModule<IgnisUIOptions>({
  meta: {
    name: '@nuxt-ignis/ui',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/ui - module dependencies are being resolved')

    const resolver = createResolver(import.meta.url)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { ui?: IgnisUIOptions } }
    const options = nuxtOpts.ignis?.ui

    let tailwindFixRequired = false

    if (options?.ui === true) {
      tailwindFixRequired = true
      modules['@nuxt/ui'] = { }
      // import tailwind css file
      nuxt.options.css.push(resolver.resolve('./runtime/css/ignis-nuxt-ui.css'))
      console.debug('@nuxt/ui module installed')
    }
    else {
      // evaluate separate Tailwind CSS
      if (options?.tailwind === true) {
        tailwindFixRequired = true
        // import tailwind css file
        nuxt.options.css.push(resolver.resolve('./runtime/css/ignis-tailwind.css'))
        // temporary integration using Vite plugin directly
        // @ts-expect-error https://github.com/tailwindlabs/tailwindcss/issues/18802
        nuxt.options.vite = defu({
          plugins: [tailwindcss()],
        }, nuxt.options.vite)
        console.debug('Tailwind CSS enabled')
      }
    }

    // TODO occasionaly check https://github.com/tailwindlabs/tailwindcss/discussions/16119 for solution
    if (tailwindFixRequired) {
      nuxt.options.vite = defu({
        vite: {
          plugins: [ignisTailwindcssFix],
        },
      }, nuxt.options.vite)
    }

    // Open Props CSS
    if (options?.openprops === true) {
      nuxt.options.css.push(resolver.resolve('./runtime/css/ignis-open-props.css'))
      nuxt.options.postcss = defu({
        plugins: {
          'postcss-jit-props': OpenProps,
        },
      }, nuxt.options.postcss)
      console.debug('Open Props CSS enabled')
    }

    // Nuxt Charts
    if (options?.charts === true) {
      modules['nuxt-charts'] = { }
      console.debug('nuxt-charts module installed')
    }

    return modules
  },
  setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { ui?: IgnisUIOptions } }
    const options = nuxtOpts.ignis?.ui

    // inject runtime config values
    const runtimeConfig = nuxt.options.runtimeConfig.public as { ignis?: { ui?: IgnisUIOptions } }
    runtimeConfig.ignis ??= {}
    runtimeConfig.ignis.ui ??= {}
    runtimeConfig.ignis.ui.ui ??= options?.ui ?? false
    runtimeConfig.ignis.ui.tailwind ??= options?.tailwind ?? false
    runtimeConfig.ignis.ui.openprops ??= options?.openprops ?? false
    runtimeConfig.ignis.ui.charts ??= options?.charts ?? false

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
