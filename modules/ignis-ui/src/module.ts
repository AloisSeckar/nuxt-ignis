import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import { join } from 'node:path'
import { defu } from 'defu'
import OpenProps from 'open-props'
import tailwindcss from '@tailwindcss/vite'
import { ignisTailwindcssFix } from './runtime/tailwind'
import type { NuxtOptions } from 'nuxt/schema'

export interface IgnisUIOptions {
  // activation flag (checked by dispatcher)
  active?: boolean
  // module-specific options
  ui?: boolean
  tailwind?: boolean
  openprops?: boolean
  charts?: boolean
  /** Absolute path to the CSS directory (provided by the core layer) */
  cssDir?: string
}

export default defineNuxtModule<IgnisUIOptions>({
  meta: {
    name: '@nuxt-ignis/ui',
    configKey: 'ignisUI',
  },
  moduleDependencies(nuxt) {
    console.debug('@nuxt-ignis/forms - module dependencies are being resolved')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modules: Record<string, any> = {}

    const nuxtOpts = nuxt.options as NuxtOptions & { ignis?: { ui?: IgnisUIOptions } }
    const options = nuxtOpts.ignisUI || nuxtOpts.ignis?.ui

    const cssDir = options?.cssDir || ''

    let tailwindFixRequired = false

    if (options?.ui === true) {
      tailwindFixRequired = true
      modules['@nuxt/ui'] = { }
      // import tailwind css file
      if (cssDir) {
        nuxt.options.css.push(join(cssDir, 'ignis-nuxt-ui.css'))
      }
      console.debug('@nuxt/ui module installed')
    }
    else {
      // evaluate separate Tailwind CSS
      if (options?.tailwind === true) {
        tailwindFixRequired = true
        // import tailwind css file
        if (cssDir) {
          nuxt.options.css.push(join(cssDir, 'ignis-tailwind.css'))
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
      if (cssDir) {
        nuxt.options.css.push(join(cssDir, 'ignis-open-props.css'))
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
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.ignis ||= {
      ui: false,
      tailwind: false,
      openprops: false,
      charts: false,
    }

    nuxt.options.runtimeConfig.public.ignis.ui = options.ui || false
    nuxt.options.runtimeConfig.public.ignis.tailwind = options.tailwind || false
    nuxt.options.runtimeConfig.public.ignis.openprops = options.openprops || false
    nuxt.options.runtimeConfig.public.ignis.charts = options.charts || false

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
