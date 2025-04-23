// scans @/i18n/locales/* for all .json files with i18n messages
// and makes them available for i18n.config.ts

import type { LocaleMessage } from '@intlify/core-base'

function getAvailableLocales() {
  return import.meta.glob('@/i18n/locales/*.json', { eager: true })
}

export function scanI18NSources() {
  const modules = getAvailableLocales()

  const messages = {} as { [x: string]: LocaleMessage<unknown> }
  for (const path in modules) {
    const locale = path.match(/\/([^/]+)\.json$/)
    if (locale && locale[1]) {
      messages[locale[1]] = modules[path] as LocaleMessage<unknown>
    }
  }

  return messages
}

export function scanI18Names() {
  const modules = getAvailableLocales()

  const locales = [] as string[]
  for (const path in modules) {
    const locale = path.match(/\/([^/]+)\.json$/)
    if (locale && locale[1]) {
      locales.push(locale[1])
    }
  }

  console.warn(locales)

  return locales
}
