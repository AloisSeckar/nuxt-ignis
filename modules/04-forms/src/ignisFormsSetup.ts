import type { PublicRuntimeConfig, RuntimeConfig } from 'nuxt/schema'
import type { IgnisFormsOptions, NuxtIgnisFormsOptions } from './module'

export function ignisModuleDependencies(nuxtOptions: NuxtIgnisFormsOptions) {
  console.debug('@nuxt-ignis/forms - module dependencies are being resolved')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modules: Record<string, any> = {}

  const options = nuxtOptions.ignis?.forms

  if (options?.vueform?.enabled === true) {
    modules['@vueform/nuxt'] = { }
    console.debug('@vueform/nuxt module installed')
  }

  if (options?.formkit?.enabled === true) {
    modules['@formkit/nuxt'] = {
      defaults: {
        autoImport: true,
        default: options.formkit?.default || 'en',
        configFile: options?.formkit?.config || './formkit.config.ts',
      },
    }
    console.debug('@formkit/nuxt module installed')
  }

  return modules
}

export function ignisModuleSetup(nuxtOptions: NuxtIgnisFormsOptions) {
  console.debug('@nuxt-ignis/forms - module setup function runs')

  const options = nuxtOptions.ignis?.forms

  // inject runtime config values
  nuxtOptions.runtimeConfig ||= {
    public: {} as PublicRuntimeConfig,
  } as RuntimeConfig

  const runtimeConfig = nuxtOptions.runtimeConfig.public as { ignis?: { forms?: IgnisFormsOptions } }
  runtimeConfig.ignis ??= {}
  runtimeConfig.ignis.forms ??= {}
  runtimeConfig.ignis.forms.formkit ??= {}
  runtimeConfig.ignis.forms.formkit.enabled ??= options?.formkit?.enabled ?? false
  runtimeConfig.ignis.forms.formkit.default ??= options?.formkit?.default ?? 'en'
  runtimeConfig.ignis.forms.formkit.config ??= options?.formkit?.config ?? './formkit.config.ts'
  runtimeConfig.ignis.forms.vueform ??= {}
  runtimeConfig.ignis.forms.vueform.enabled ??= options?.vueform?.enabled ?? false
}
