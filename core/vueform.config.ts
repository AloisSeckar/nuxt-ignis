// this is basic "getting started" configuration example
// for more options check:
// https://vueform.com/docs/configuration

import en from '@vueform/vueform/locales/en'
import vueform from '@vueform/vueform/dist/vueform'
import { defineConfig } from '@vueform/vueform'

// add Vueform type definitions
import '@vueform/vueform/types/index.d.ts'

// add default CSS styles
// can be placed anywhere else in your project
import '@vueform/vueform/dist/vueform.css'

export default defineConfig({
  theme: vueform,
  locales: { en },
  locale: 'en',
})
