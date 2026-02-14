import { defineNuxtModule, addPlugin, createResolver, installModule } from '@nuxt/kit'

export interface ModuleOptions {
  eslint?: boolean
  fonts?: boolean
  image?: boolean
  scripts?: boolean
  security?: boolean
  vueuse?: boolean
  pinia?: boolean
  auth?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@nuxt-ignis/core',
    configKey: 'ignisCore',
  },
  defaults: {
    eslint: true,
    fonts: true,
    image: true,
    scripts: true,
    security: true,
    auth: false,
    vueuse: true,
    pinia: true,
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.ignis ||= {
      core: {
        eslint: true,
        fonts: true,
        image: true,
        scripts: true,
        security: true,
        auth: false,
        vueuse: true,
        pinia: true,
      },
    }

    // https://nuxt.com/modules/eslint
    if (options.eslint !== false) {
      installModule('@nuxt/eslint')
      console.debug('@nuxt/eslint module installed')
    }

    // https://nuxt.com/modules/fonts
    if (options.fonts !== false) {
      installModule('@nuxt/fonts')
      console.debug('@nuxt/fonts module installed')
    }

    // https://image.nuxt.com/
    if (options.image !== false) {
      installModule('@nuxt/image')
      console.debug('@nuxt/image module installed')
    }

    // https://scripts.nuxt.com/
    if (options.scripts !== false) {
      installModule('@nuxt/scripts')
      console.debug('@nuxt/scripts module installed')
    }

    // https://nuxt.com/modules/security
    if (options.security !== false) {
      installModule('nuxt-security')
      console.debug('nuxt-security module installed')
    }

    // https://github.com/atinux/nuxt-auth-utils
    if (options.auth === true) {
      installModule('nuxt-auth-utils')
      console.debug('nuxt-auth-utils module installed')
    }

    // https://nuxt.com/modules/vueuse
    if (options.vueuse !== false) {
      installModule('@vueuse/nuxt')
      console.debug('@vueuse/nuxt module installed')
    }

    // https://pinia.vuejs.org/ssr/nuxt.html
    if (options.pinia !== false) {
      installModule('@pinia/nuxt')
      console.debug('@pinia/nuxt module installed')
    }

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
