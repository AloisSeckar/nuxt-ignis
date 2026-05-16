// Proxy for `preventSingleLetterOrphans` from `elrh-pslo`
// Only applies the text transformation if the relevant option is enabled

import { useRuntimeConfig } from '#imports'
import { preventSingleLetterOrphans } from 'elrh-pslo'
import { consola } from 'consola'

export function pslo(text: string) {
  if (useRuntimeConfig().public.ignis.content.pslo.enabled === 'true') {
    consola.debug(`treating text input with elrh-pslo`)
    return preventSingleLetterOrphans(text)
  } else {
    return text
  }
}
