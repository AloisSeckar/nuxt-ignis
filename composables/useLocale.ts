/**
 * Custom wrapper around `useI18n()` composable
 * which is apparently not available out of the box in target apps
 */
export function useIgnisI18n() {
  const i18n = useRuntimeConfig().public.ignis.i18n
  if (i18n.enabled) {
    return {
      ...useI18n(),
    }
  } else {
    return {
      locale: ref(i18n.default || 'en'),
      // TODO possible other defaults?
    }
  }
}
