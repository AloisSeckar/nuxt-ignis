import { preventSingleLetterOrphans } from 'elrh-pslo'

// this util function proxies "preventSingleLetterOrphans" function
// it only applies the text transformation if relevant options is set up
export function pslo(text: string) {
  if (process.env.NUXT_PUBLIC_IGNIS_PSLO_ENABLED === 'true') {
    log.warn(`elrh-pslo activated`)
    return preventSingleLetterOrphans(text)
  } else {
    return text
  }
}
