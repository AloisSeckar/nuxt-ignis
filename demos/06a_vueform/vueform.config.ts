import { defineConfig } from '@vueform/vueform'

const vueformConfig = await maybeLoadVueformConfig()

export default defineConfig(vueformConfig)
