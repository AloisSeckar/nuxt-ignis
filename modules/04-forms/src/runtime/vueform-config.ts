// Merges user Vueform config with Nuxt Ignis defaults and returns the result
// Used by the auto-generated vueform.config template or by custom user config files

import { defu } from 'defu'

import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

// add Vueform type definitions
import '@vueform/vueform/types/index.d.ts'

// add default CSS styles
// can be placed anywhere else in your project
// @ts-expect-error no type declarations for CSS side-effect import
import '@vueform/vueform/dist/vueform.css'

import type { VueformConfig } from '@vueform/vueform'

export function loadVueformConfig(userVueformConfig: Partial<VueformConfig>) {
  return defu(userVueformConfig, defineConfig({
    theme: vueform,
    locales: { en },
    locale: 'en',
  }))
}
