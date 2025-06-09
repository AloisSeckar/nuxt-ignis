// Vueform requires its configuration to be injected and config exported
// this normally happens in vueform.config.ts file in project root
// however, it is not possible to transfer this config file when extending a layer
// user only have to setup small custom config file in his own project
// more info in the docs
// TODO can this be changed? can layer's "auto-imports" be configured?

import { defu } from 'defu'

import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

import '@vueform/vueform/types/index.d.ts'
import '@vueform/vueform/dist/vueform.css'

// @ts-expect-error no-implicit-any
// TODO set proper type for the object
export function getVueformConfig(userVueformConfig) {
  return defu(userVueformConfig, defineConfig({
    theme: vueform,
    locales: { en },
    locale: 'en',
  }))
}
