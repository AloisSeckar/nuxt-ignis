// this function adresses https://github.com/AloisSeckar/nuxt-ignis/issues/71
// Vueform requires its configuration to be injected and config exported
// this normally happens in vueform.config.ts file in project root
// however, it is not possible to transfer this config file when extending a layer
// user only have to setup small custom config file in his own project
// more info in the docs
// TODO can this be changed? can layer's "auto-imports" be configured?

export async function loadDefaultVueformConfig() {
  const config = useRuntimeConfig().public.ignis
  if (config.preset.forms === 'vueform' || config.vueform === true) {
    const vueformConfig = await import('./vueform/vueform.config')
    return vueformConfig.default
  }
  return null
}
