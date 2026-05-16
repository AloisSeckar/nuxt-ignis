import type { IgnisOptions } from '../02-features'

// custom bridge used to populate Ignis options from .env variables (if present)
// .env variables take precedence over options passed directly from nuxt.config.ts
export function envApply(opts: IgnisOptions) {
  // presets
  opts.preset ??= {}
  opts.preset.ui = process.env.NUXT_PUBLIC_IGNIS_PRESET_UI as 'nuxt-ui' | 'tailwind' | 'off' || opts.preset.ui || 'off'
  opts.preset.db = process.env.NUXT_PUBLIC_IGNIS_PRESET_DB as 'neon' | 'supabase' | 'off' || opts.preset.db || 'off'
  opts.preset.forms = process.env.NUXT_PUBLIC_IGNIS_PRESET_FORMS as 'vueform' | 'formkit' | 'off' || opts.preset.forms || 'off'
  opts.preset.validation = process.env.NUXT_PUBLIC_IGNIS_PRESET_VALIDATION as 'zod' | 'valibot' | 'off' || opts.preset.validation || 'off'

  // config
  opts.config ??= {}
  opts.config.html ??= {}
  opts.config.html.title = process.env.NUXT_PUBLIC_IGNIS_CONFIG_HTML_TITLE || opts.config.html.title || 'Nuxt Ignis App'
  opts.config.html.lang = process.env.NUXT_PUBLIC_IGNIS_CONFIG_HTML_LANG || opts.config.html.lang || 'en'
  opts.config.nuxt ??= {}
  opts.config.nuxt.ssr = process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_SSR !== undefined ? process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_SSR === 'true' : opts.config.nuxt.ssr ?? true
  opts.config.nuxt.pages = process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_PAGES !== undefined ? process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_PAGES === 'true' : opts.config.nuxt.pages ?? true
  opts.config.nuxt.css = process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_CSS || opts.config.nuxt.css || undefined
  opts.config.nuxt.error = process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_ERROR !== undefined ? process.env.NUXT_PUBLIC_IGNIS_CONFIG_NUXT_ERROR === 'true' : opts.config.nuxt.error ?? true
  opts.config.log ??= {}
  opts.config.log.level = process.env.NUXT_PUBLIC_IGNIS_CONFIG_LOG_LEVEL as 'info' | 'warn' | 'error' | 'debug' | undefined || opts.config.log.level || 'info'
  opts.config.warn ??= {}
  opts.config.warn.duplicates = process.env.NUXT_PUBLIC_IGNIS_CONFIG_WARN_DUPLICATES !== undefined ? process.env.NUXT_PUBLIC_IGNIS_CONFIG_WARN_DUPLICATES === 'true' : opts.config.warn.duplicates ?? true

  // @nuxt-ignis/default
  opts.default ??= {}
  opts.default.eslint = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_ESLINT !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_ESLINT === 'true' : opts.default.eslint ?? true
  opts.default.fonts = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_FONTS !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_FONTS === 'true' : opts.default.fonts ?? true
  opts.default.image = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_IMAGE !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_IMAGE === 'true' : opts.default.image ?? true
  opts.default.scripts = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_SCRIPTS !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_SCRIPTS === 'true' : opts.default.scripts ?? true
  opts.default.security = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_SECURITY !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_SECURITY === 'true' : opts.default.security ?? true
  opts.default.auth = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_AUTH !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_AUTH === 'true' : opts.default.auth ?? true
  opts.default.vueuse = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_VUEUSE !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_VUEUSE === 'true' : opts.default.vueuse ?? true
  opts.default.pinia = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_PINIA !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_PINIA === 'true' : opts.default.pinia ?? true
  opts.default.css = process.env.NUXT_PUBLIC_IGNIS_DEFAULT_CSS !== undefined ? process.env.NUXT_PUBLIC_IGNIS_DEFAULT_CSS === 'true' : opts.default.css ?? true

  // @nuxt-ignis/ui
  opts.ui ??= {}
  opts.ui.tailwind = process.env.NUXT_PUBLIC_IGNIS_UI_TAILWIND === 'true' || opts.ui.tailwind || opts.preset.ui === 'tailwind' || false
  opts.ui.openprops = process.env.NUXT_PUBLIC_IGNIS_UI_OPENPROPS === 'true' || opts.ui.openprops || false
  opts.ui.charts = process.env.NUXT_PUBLIC_IGNIS_UI_CHARTS === 'true' || opts.ui.charts || false
  opts.ui.ui = process.env.NUXT_PUBLIC_IGNIS_UI_UI === 'true' || opts.ui.ui || opts.preset.ui === 'nuxt-ui' || false

  // @nuxt-ignis/db
  opts.db ??= {}
  opts.db.neon ??= {}
  opts.db.neon.enabled = process.env.NUXT_PUBLIC_IGNIS_DB_NEON_ENABLED === 'true' || opts.db.neon.enabled || opts.preset.db === 'neon' || false
  opts.db.supabase ??= {}
  opts.db.supabase.enabled = process.env.NUXT_PUBLIC_IGNIS_DB_SUPABASE_ENABLED === 'true' || opts.db.supabase.enabled || opts.preset.db === 'supabase' || false
  opts.db.supabase.types = process.env.NUXT_PUBLIC_IGNIS_DB_SUPABASE_TYPES || opts.db.supabase.types || false

  // @nuxt-ignis/forms
  opts.forms ??= {}
  opts.forms.formkit ??= {}
  opts.forms.formkit.enabled = process.env.NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_ENABLED === 'true' || opts.forms.formkit.enabled || opts.preset.forms === 'formkit' || false
  opts.forms.formkit.default = process.env.NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_DEFAULT || opts.forms.formkit.default || ''
  opts.forms.formkit.config = process.env.NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_CONFIG || opts.forms.formkit.config || ''
  opts.forms.vueform ??= {}
  opts.forms.vueform.enabled = process.env.NUXT_PUBLIC_IGNIS_FORMS_VUEFORM_ENABLED === 'true' || opts.forms.vueform.enabled || opts.preset.forms === 'vueform' || false

  // @nuxt-ignis/validation
  opts.validation ??= {}
  opts.validation.zod = process.env.NUXT_PUBLIC_IGNIS_VALIDATION_ZOD === 'true' || opts.validation.zod || opts.preset.validation === 'zod' || false
  opts.validation.valibot = process.env.NUXT_PUBLIC_IGNIS_VALIDATION_VALIBOT === 'true' || opts.validation.valibot || opts.preset.validation === 'valibot' || false

  // @nuxt-ignis/content
  opts.content ??= {}
  opts.content.content ??= {}
  opts.content.content.enabled = process.env.NUXT_PUBLIC_IGNIS_CONTENT_CONTENT_ENABLED === 'true' || opts.content.content.enabled || false
  opts.content.i18n ??= {}
  opts.content.i18n.enabled = process.env.NUXT_PUBLIC_IGNIS_CONTENT_I18N_ENABLED === 'true' || opts.content.i18n.enabled || false
  opts.content.i18n.default = process.env.NUXT_PUBLIC_IGNIS_CONTENT_I18N_DEFAULT || opts.content.i18n.default || 'en'
  opts.content.seo ??= {}
  opts.content.seo.enabled = process.env.NUXT_PUBLIC_IGNIS_CONTENT_SEO_ENABLED === 'true' || opts.content.seo.enabled || false
  opts.content.social ??= {}
  opts.content.social.enabled = process.env.NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_ENABLED === 'true' || opts.content.social.enabled || false
  opts.content.social.url = process.env.NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_URL || opts.content.social.url || ''
  opts.content.pslo ??= {}
  opts.content.pslo.enabled = process.env.NUXT_PUBLIC_IGNIS_CONTENT_PSLO_ENABLED === 'true' || opts.content.pslo.enabled || false
  opts.content.pslo.content = process.env.NUXT_PUBLIC_IGNIS_CONTENT_PSLO_CONTENT === 'true' || opts.content.pslo.content || false

  // @nuxt-ignis/utils
  opts.utils ??= {}
  opts.utils.equipment ??= {}
  opts.utils.equipment.enabled = process.env.NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_ENABLED === 'true' || opts.utils.equipment.enabled || false
  opts.utils.equipment.composables = process.env.NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_COMPOSABLES || opts.utils.equipment.composables || ''
  opts.utils.equipment.plugins = process.env.NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_PLUGINS || opts.utils.equipment.plugins || ''
  opts.utils.regexp ??= {}
  opts.utils.regexp.enabled = process.env.NUXT_PUBLIC_IGNIS_UTILS_REGEXP_ENABLED === 'true' || opts.utils.regexp.enabled || false
}
