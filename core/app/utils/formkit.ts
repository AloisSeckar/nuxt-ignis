// Merges user FormKit config with Nuxt Ignis defaults
// Note: This file is only loaded by @formkit/nuxt when FormKit is enabled,
// so no need to check enablement here - it's already gated at the module level
// TODO remove the redundant encapsulating then...

import { getFormkitConfig, type FormkitConfigOptions } from './config/formkit'

export function loadFormkitConfig(userFormkitConfig: FormkitConfigOptions) {
  // defu-merge nuxt-ignis default with possible user values
  return getFormkitConfig(userFormkitConfig)
}
