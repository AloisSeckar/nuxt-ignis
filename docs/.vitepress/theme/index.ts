import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import PackagesReference from './components/PackagesReference.vue'

import './ignis.css'

import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'virtual:group-icons.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('PackagesReference', PackagesReference)
  }
} satisfies Theme