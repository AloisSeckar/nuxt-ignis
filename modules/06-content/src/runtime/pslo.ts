// Proxy for `preventSingleLetterOrphans` from `elrh-pslo`
// Only applies the text transformation if the relevant option is enabled

import { preventSingleLetterOrphans } from 'elrh-pslo'
import { consola } from 'consola'

export function pslo(text: string) {
  if (process.env.NUXT_PUBLIC_IGNIS_PSLO_ENABLED === 'true') {
    consola.debug(`treating text input with elrh-pslo`)
    return preventSingleLetterOrphans(text)
  }
  else {
    return text
  }
}
