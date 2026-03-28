import type { IgnisOptions } from '../02-features'

/** Core module is active unless every feature is explicitly disabled. */
export function isCoreActive(opts: IgnisOptions): boolean {
  const c = opts.core
  if (!c) return true
  return !!(c.eslint || c.fonts || c.image || c.scripts || c.security || c.auth || c.vueuse || c.pinia)
}

/** UI module is active when any UI feature is enabled or a UI preset is selected. */
export function isUiActive(opts: IgnisOptions): boolean {
  if (isPresetSet(opts.preset?.ui)) return true
  const u = opts.ui
  if (!u) return false
  return !!(u.ui || u.tailwind || u.openprops || u.charts)
}

/** DB module is active when any DB connector is enabled or a DB preset is selected. */
export function isDbActive(opts: IgnisOptions): boolean {
  if (isPresetSet(opts.preset?.db)) return true
  const d = opts.db
  if (!d) return false
  return !!(d.neon?.enabled || d.supabase?.enabled)
}

/** Forms module is active when any form provider is enabled or a forms preset is selected. */
export function isFormsActive(opts: IgnisOptions): boolean {
  if (isPresetSet(opts.preset?.forms)) return true
  const f = opts.forms
  if (!f) return false
  return !!(f.formkit?.enabled || f.vueform?.enabled)
}

/** Validation module is active when any validation lib is enabled or a validation preset is selected. */
export function isValidationActive(opts: IgnisOptions): boolean {
  if (isPresetSet(opts.preset?.validation)) return true
  const v = opts.validation
  if (!v) return false
  return !!(v.zod || v.valibot)
}

/** Content module is active when any content feature is enabled. */
export function isContentActive(opts: IgnisOptions): boolean {
  const c = opts.content
  if (!c) return false
  return !!(c.content?.enabled || c.i18n?.enabled || c.seo?.enabled || c.social?.enabled || c.pslo?.enabled)
}

/** Utils module is active when any utility feature is enabled. */
export function isUtilsActive(opts: IgnisOptions): boolean {
  const u = opts.utils
  if (!u) return false
  return !!(u.equipment?.enabled || u.regexp?.enabled)
}

function isPresetSet(value: string | undefined): boolean {
  return !!value && value !== 'off'
}
