// #154 - this should remain in core as useT and useIgnisT must be globally available
// even if @nuxt-ignis/content module is not active and i18n integration is disabled

import lang from '@/../i18n/locales/en.json'

/**
 * An adapter above `t` function from `i18n` module.
 *
 * This function is basically a shorthand for obtaining `i18n` translation in scripts.
 * In templates `$t` function is available, but in scripts we normally have to
 * access the `t` function via the instance of `$i18n` living inside current Nuxt App.
 *
 * Since $i18n is an optional dependency in Nuxt Ignis setup, this also gracefully handles
 * cases when user turns the module off while still using the translations in the code.
 *
 * @param key identifier of text that should be displayed
 * @returns translated text from i18n sources
 */
export function useT(key: string): string {
  if (useRuntimeConfig().public.ignis.content.i18n.enabled) {
    // i18n available => just use it
    return (useNuxtApp().$i18n as { t: (key: string) => string }).t(key)
  } else {
    // backdoor for Nuxt Ignis to display values on demo index page
    const backdoorValue = useIgnisT(key)
    if (backdoorValue !== '???') {
      return backdoorValue
    }
    // for other custom values a warning will be produced and a placeholder will be returned
    log.warn('@nuxtjs/i18n is not enabled, translations are not available.')
    return 'Translation not available'
  }
}

/**
 * Helper to search a value for given key in JSON lang file.
 *
 * @param key identifier of text that should be displayed with optional dot notation for nesting (e.g. "foo.bar")
 * @returns hardcoded text from '@/i18n/locales/en.json' of nuxt-ignis package (providing the key exists)
 */
export function useIgnisT(key: string): string {
  // get path to (nested) key
  const keys = key.split('.')
  // reduce original object only to matching segment
  // (matched sub-tree, matched string value or undefined if no match)
  const value = keys.reduce<unknown>(
    (acc, k) => acc !== null && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined,
    lang,
  )
  // matching leaf found
  if (typeof value === 'string') {
    return value
  }
  // anything else indicates the given key was not valid
  log.debug(`useIgnisT: string value not found for "${key}"`)
  return '???'
}
