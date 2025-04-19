import lang from '@/i18n/locales/en.json'

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
  if (useRuntimeConfig().public.ignis.i18n.enabled) {
    // i18n available => just use it
    return useNuxtApp().$i18n.t(key)
  } else {
    // backdoor for Nuxt Ignis to display values on demo index page
    const backdoorValue = searchLang(key)
    if (backdoorValue) {
      return backdoorValue as string
    }
    // for other custom values a warning will be produced and a placeholder will be returned
    log.warn('@nuxtjs/i18n turned off, translations are not available (set NUXT_PUBLIC_IGNIS_I18N=true)')
    return 'Translation not available'
  }
}

/** AI-generated helper to search a value for given key in JSON lang file. */
function searchLang(key: string): unknown {
  const keys = key.split('.')

  let current = lang
  for (const key of keys) {
    if (current && key in current) {
      // @ts-expect-error TODO this should be fixed
      current = current[key]
    } else {
      return undefined
    }
  }

  return current
}
