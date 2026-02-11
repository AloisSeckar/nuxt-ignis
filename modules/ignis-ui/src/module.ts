import { defineNuxtModule, addPlugin, createResolver, installModule } from '@nuxt/kit'
import { join } from 'node:path'
import { defu } from 'defu'
import OpenProps from 'open-props'
import tailwindcss from '@tailwindcss/vite'
import { ignisTailwindcssFix } from './runtime/tailwind'

export interface ModuleOptions {
  ui?: boolean
  tailwind?: boolean
  openprops?: boolean
  charts?: boolean
  /** Absolute path to the CSS directory (provided by the core layer) */
  cssDir?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/ui',
    configKey: 'ignisUI',
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

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

    const cssDir = options.cssDir || ''

    let tailwindFixRequired = false

    if (options.ui === true) {
      tailwindFixRequired = true
      installModule('@nuxt/ui')
      // import tailwind css file
      if (cssDir) {
        nuxt.options.css.push(join(cssDir, 'ignis-nuxt-ui.css'))
      }
      console.debug('@nuxt/ui module installed')
    }
    else {
      // remove @nuxt/ui-specific components from resolution if Nuxt UI module is not used
      nuxt.options.vue = defu({
        compilerOptions: {
          isCustomElement: (tag: string) => tag === 'Icon' || tag === 'UApp',
        },
      }, nuxt.options.vue)

      // evaluate separate Tailwind CSS
      if (options.tailwind === true) {
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
    if (options.openprops === true) {
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
    if (options.charts === true) {
      installModule('nuxt-charts')
      console.debug('nuxt-charts module installed')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
