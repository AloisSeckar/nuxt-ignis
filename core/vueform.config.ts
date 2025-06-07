// minimal config for Vueform
// currently required to be loaded like this...

import { defineConfig } from '@vueform/vueform'

const vueformConfig = await loadDefaultVueformConfig()

export default defineConfig(vueformConfig!)
