import { createResolver } from '@nuxt/kit'
import { defu } from 'defu'
import OpenProps from 'open-props'
import tailwindcss from '@tailwindcss/vite'
import { ignisTailwindcssFix } from './runtime/tailwind'
import type { IgnisUIOptions, NuxtIgnisUIOptions } from './module'

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisUIOptions) {
  console.debug('@nuxt-ignis/ui - module dependencies are being resolved')

  const resolver = createResolver(import.meta.url)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  const options = nuxtOptions.ignis?.ui

  let tailwindFixRequired = false

  if (options?.ui === true) {
    tailwindFixRequired = true
    modules['@nuxt/ui'] = { }
    // import tailwind css file
    nuxtOptions.css.push(resolver.resolve('./runtime/css/ignis-nuxt-ui.css'))
    console.debug('@nuxt/ui module installed')
  }
  else {
    // evaluate separate Tailwind CSS
    if (options?.tailwind === true) {
      tailwindFixRequired = true
      // import tailwind css file
      nuxtOptions.css.push(resolver.resolve('./runtime/css/ignis-tailwind.css'))
      // temporary integration using Vite plugin directly
      // @ts-expect-error https://github.com/tailwindlabs/tailwindcss/issues/18802
      nuxtOptions.vite = defu({
        plugins: [tailwindcss()],
      }, nuxtOptions.vite)
      console.debug('Tailwind CSS enabled')
    }
  }

  // TODO occasionaly check https://github.com/tailwindlabs/tailwindcss/discussions/16119 for solution
  if (tailwindFixRequired) {
    nuxtOptions.vite = defu({
      vite: {
        plugins: [ignisTailwindcssFix],
      },
    }, nuxtOptions.vite)
  }

  // Open Props CSS
  if (options?.openprops === true) {
    nuxtOptions.css.push(resolver.resolve('./runtime/css/ignis-open-props.css'))
    nuxtOptions.postcss = defu({
      plugins: {
        'postcss-jit-props': OpenProps,
      },
    }, nuxtOptions.postcss)
    console.debug('Open Props CSS enabled')
  }

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
  const runtimeConfig = nuxtOptions.runtimeConfig.public as { ignis?: { ui?: IgnisUIOptions } }
  runtimeConfig.ignis ??= {}
  runtimeConfig.ignis.ui ??= {}
  runtimeConfig.ignis.ui.ui ??= options?.ui ?? false
  runtimeConfig.ignis.ui.tailwind ??= options?.tailwind ?? false
  runtimeConfig.ignis.ui.openprops ??= options?.openprops ?? false
  runtimeConfig.ignis.ui.charts ??= options?.charts ?? false
}
