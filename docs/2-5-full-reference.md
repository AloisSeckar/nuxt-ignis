# Full reference

Detailed list of all configuration options.

Every option can be configured in two equivalent ways - either as an environment variable in `.env` (or via your hosting provider) or as a typed property under the `ignis` key in `nuxt.config.ts`. Environment variables take precedence over `nuxt.config.ts` values when both are provided.

## Default features

Following Nuxt modules are enabled by default and can be opted-out by setting respective config value:

| .env variable | `nuxt.config.ts` (`ignis.*`) | Values | Default | Description |
| --- | --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_DEFAULT_ESLINT` | `default.eslint` | `boolean` | `true` | Enable or disable `@nuxt/eslint` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_FONTS` | `default.fonts` | `boolean` | `true` | Enable or disable `@nuxt/fonts` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_IMAGE` | `default.image` | `boolean` | `true` | Enable or disable `@nuxt/image` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_SCRIPTS` | `default.scripts` | `boolean` | `true` | Enable or disable `@nuxt/scripts` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_SECURITY` | `default.security` | `boolean` | `true` | Enable or disable `nuxt-security` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_AUTH` | `default.auth` | `boolean` | `true` | Enable or disable `nuxt-auth-utils` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_VUEUSE` | `default.vueuse` | `boolean` | `true` | Enable or disable `@vueuse/nuxt` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_PINIA` | `default.pinia` | `boolean` | `true` | Enable or disable `@pinia/nuxt` module |
| `NUXT_PUBLIC_IGNIS_DEFAULT_CSS` | `default.css` | `boolean` | `true` | Default `ignis.css` stylesheet will (not) be included |

## Optional modules/features

Following Nuxt modules/features are disabled by default and can be opted-in by setting respective config value:

| .env variable | `nuxt.config.ts` (`ignis.*`) | Values | Default | Description |
| --- | --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_UI_UI` | `ui.ui` | `boolean` | `false` | Enable or disable `@nuxt/ui` module |
| `NUXT_PUBLIC_IGNIS_UI_TAILWIND` | `ui.tailwind` | `boolean` | `false` | Enable or disable `Tailwind CSS` (ignored if `ui.ui=true`) |
| `NUXT_PUBLIC_IGNIS_UI_OPENPROPS` | `ui.openprops` | `boolean` | `false` | Enable or disable `Open Props CSS` |
| `NUXT_PUBLIC_IGNIS_UI_CHARTS` | `ui.charts` | `boolean` | `false` | Enable or disable `nuxt-charts` module |
| `NUXT_PUBLIC_IGNIS_DB_NEON_ENABLED` | `db.neon.enabled` | `boolean` | `false` | Enable or disable `nuxt-neon` module |
| `NUXT_PUBLIC_IGNIS_DB_SUPABASE_ENABLED` | `db.supabase.enabled` | `boolean` | `false` | Enable or disable `@nuxtjs/supabase` module |
| `NUXT_PUBLIC_IGNIS_FORMS_VUEFORM_ENABLED` | `forms.vueform.enabled` | `boolean` | `false` | Enable or disable `@vueform/nuxt` module |
| `NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_ENABLED` | `forms.formkit.enabled` | `boolean` | `false` | Enable or disable `@formkit/nuxt` module |
| `NUXT_PUBLIC_IGNIS_VALIDATION_VALIBOT` | `validation.valibot` | `boolean` | `false` | Enable or disable `valibot` |
| `NUXT_PUBLIC_IGNIS_VALIDATION_ZOD` | `validation.zod` | `boolean` | `false` | Enable or disable `zod` |
| `NUXT_PUBLIC_IGNIS_CONTENT_CONTENT_ENABLED` | `content.content.enabled` | `boolean` | `false` | Enable or disable `@nuxt/content` module |
| `NUXT_PUBLIC_IGNIS_CONTENT_I18N_ENABLED` | `content.i18n.enabled` | `boolean` | `false` | Enable or disable `@nuxtjs/i18n` module |
| `NUXT_PUBLIC_IGNIS_CONTENT_SEO_ENABLED` | `content.seo.enabled` | `boolean` | `false` | Enable or disable `@nuxtjs/seo` module |
| `NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_ENABLED` | `content.social.enabled` | `boolean` | `false` | Enable or disable `@stefanobartoletti/nuxt-social-share` module |
| `NUXT_PUBLIC_IGNIS_CONTENT_PSLO_ENABLED` | `content.pslo.enabled` | `boolean` | `false` | Enable or disable `elrh-pslo` |
| `NUXT_PUBLIC_IGNIS_UTILS_REGEXP_ENABLED` | `utils.regexp.enabled` | `boolean` | `false` | Enable or disable `magic-regexp` module |
| `NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_ENABLED` | `utils.equipment.enabled` | `boolean` | `false` | Enable or disable `Vue Equipment` |

## Presets

For some common functional areas there are choices from 2+ options:

| .env variable | `nuxt.config.ts` (`ignis.*`) | Values | Default | Description |
| --- | --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_PRESET_UI` | `preset.ui` | `nuxt-ui \| tailwind \| off` | `off` | Set UI solution - `@nuxt/ui` or  `Tailwind CSS` |
| `NUXT_PUBLIC_IGNIS_PRESET_DB` | `preset.db` | `neon \| supabase \| off` | `off` | Set DB solution - `nuxt-neon` or  `@nuxtjs/supabase` |
| `NUXT_PUBLIC_IGNIS_PRESET_FORMS` | `preset.forms` | `vueform \| formkit \| off` | `off` | Set forms solution - `@vueform/nuxt` or  `@formkit/nuxt` |
| `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION` | `preset.validation` | `valibot \| zod \| off` | `off` | Set validation solution - `valibot` or  `zod` |

## Other config

Other configurable options:

| .env variable | `nuxt.config.ts` (`ignis.*`) | Values | Default | Description |
| --- | --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_CONTENT_I18N_DEFAULT` | `content.i18n.default` | `string` | `''` | Set default locale for `i18n` (falls back to `en` at runtime) |
| `NUXT_PUBLIC_IGNIS_DB_SUPABASE_TYPES` | `db.supabase.types` | `string` or `false` | `false` | Set path to Supabase types definition file |
| `NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_DEFAULT` | `forms.formkit.default` | `string` | `''` | Set default locale for `@formkit/nuxt` |
| `NUXT_PUBLIC_IGNIS_FORMS_FORMKIT_CONFIG` | `forms.formkit.config` | `string` | `''` | Set path to `@formkit/nuxt` config file |
| `NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_COMPOSABLES` | `utils.equipment.composables` | `string` | `''` | Coma-separated list of `Vue Equipment` composables to be imported |
| `NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_PLUGINS` | `utils.equipment.plugins` | `string` | `''` | Coma-separated list of `Vue Equipment` plugins to be imported |
| `NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_URL` | `content.social.url` | `string` | `''` | URL used by `@stefanobartoletti/nuxt-social-share` module for sharing to social networks |
| `NUXT_PUBLIC_IGNIS_CONTENT_PSLO_CONTENT` | `content.pslo.content` | `boolean` | `false` | If both `elrh-pslo` and `@nuxt/content` are enabled, this allows or disallows Markdown content pre-processing with `pslo` function |
| `NUXT_PUBLIC_IGNIS_CONFIG_HTML_TITLE` | `config.html.title` | `string` | `Nuxt Ignis App` | HTML title of the application |
| `NUXT_PUBLIC_IGNIS_CONFIG_HTML_LANG` | `config.html.lang` | `string` | `en` | HTML lang attribute of the application |
| `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_CSS` | `config.nuxt.css` | `string` | `''` | Comma-separated list of paths to custom CSS files to be included |
| `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_PAGES` | `config.nuxt.pages` | `boolean` | `true` | Set to `false` to disable multiple pages and routing |
| `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_SSR` | `config.nuxt.ssr` | `boolean` | `true` | Set to `false` to disable server side rendering |
| `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_ERROR` | `config.nuxt.error` | `boolean` | `true` | Set to `false` to turn default error and warn handlers off |
| `NUXT_PUBLIC_IGNIS_CONFIG_WARN_DUPLICATES` | `config.warn.duplicates` | `boolean` | `true` | Set to `false` to allow more than one preset solution at once |
| `NUXT_PUBLIC_IGNIS_CONFIG_LOG_LEVEL` | `config.log.level` | `info`, `warn`, `error`, `debug` | `info` | Set level of log messages captured with `consola` |

## More info

- See details about Nuxt Ignis in [features section](/3-1-features).
