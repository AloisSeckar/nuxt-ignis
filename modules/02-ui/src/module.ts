import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { join } from 'node:path'
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
  /** Absolute path to the CSS directory (provided by the core layer) */
  _cssDir?: string
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis: { ui?: IgnisUIOptions } }
    const options = nuxtOpts.ignis?.ui

    const _cssDir = options?._cssDir || ''

    let tailwindFixRequired = false

    if (options?.ui === true) {
      tailwindFixRequired = true
      modules['@nuxt/ui'] = { }
      // import tailwind css file
      if (_cssDir) {
        nuxt.options.css.push(join(_cssDir, 'ignis-nuxt-ui.css'))
      }
      console.debug('@nuxt/ui module installed')
    }
    else {
      // evaluate separate Tailwind CSS
      if (options?.tailwind === true) {
        tailwindFixRequired = true
        // import tailwind css file
        if (_cssDir) {
          nuxt.options.css.push(join(_cssDir, 'ignis-tailwind.css'))
        }
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
      if (_cssDir) {
        nuxt.options.css.push(join(_cssDir, 'ignis-open-props.css'))
      }
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
    nuxt.options.runtimeConfig.public.ignis ||= {}
    nuxt.options.runtimeConfig.public.ignis.ui ||= {
      ui: options?.ui || false,
      tailwind: options?.tailwind || false,
      openprops: options?.openprops || false,
      charts: options?.charts || false,
    }

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
