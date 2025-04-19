import { preventSingleLetterOrphans } from 'elrh-pslo'

// this util function proxies "preventSingleLetterOrphans" function
// it only applies the text transformation if relevant options is set up
export function pslo(text: string) {
  if (useRuntimeConfig().public.ignis.pslo.enabled) {
    return preventSingleLetterOrphans(text)
  } else {
    return text
  }
}
