# Full reference

Detailed list of all configuration options

## Core features

Following Nuxt modules are enabled by default and can be opted-out by setting respective config value:

| .env variable | Values | Default | Description |
| --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_CORE_ESLINT` | `boolean` | `true` | Enable or disable `@nuxt/eslint` module |
| `NUXT_PUBLIC_IGNIS_CORE_FONTS` | `boolean` | `true` | Enable or disable `@nuxt/fonts` module |
| `NUXT_PUBLIC_IGNIS_CORE_IMAGE` | `boolean` | `true` | Enable or disable `@nuxt/image` module |
| `NUXT_PUBLIC_IGNIS_CORE_SCRIPTS` | `boolean` | `true` | Enable or disable `@nuxt/scripts` module |
| `NUXT_PUBLIC_IGNIS_CORE_SECURITY` | `boolean` | `true` | Enable or disable `nuxt-security` module |
| `NUXT_PUBLIC_IGNIS_CORE_VUEUSE` | `boolean` | `true` | Enable or disable `@vueuse/nuxt` module |
| `NUXT_PUBLIC_IGNIS_CORE_PINIA` | `boolean` | `true` | Enable or disable `@pinia/nuxt` module |

## Optional modules/features

Following Nuxt modules/features are disabled by default and can be opted-in by setting respective config value:

| .env variable | Values | Default | Description |
| --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_UI` | `boolean` | `false` | Enable or disable `@nuxt/ui` module |
| `NUXT_PUBLIC_IGNIS_TAILWIND` | `boolean` | `false` | Enable or disable `Tailwind CSS` (ignored if `NUXT_PUBLIC_IGNIS_UI=true`) |
| `NUXT_PUBLIC_IGNIS_NEON` | `boolean` | `false` | Enable or disable `nuxt-neon` module |
| `NUXT_PUBLIC_IGNIS_SUPABASE` | `boolean` | `false` | Enable or disable `@nuxtjs/supabase` module |
| `NUXT_PUBLIC_IGNIS_VUEFORM` | `boolean` | `false` | Enable or disable `@vueform/nuxt` module |
| `NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED` | `boolean` | `false` | Enable or disable `@formkit/nuxt` module |
| `NUXT_PUBLIC_IGNIS_I18N_ENABLED` | `boolean` | `false` | Enable or disable `@nuxtjs/i18n` module |
| `NUXT_PUBLIC_IGNIS_CONTENT` | `boolean` | `false` | Enable or disable `@nuxt/content` module |
| `NUXT_PUBLIC_IGNIS_SEO` | `boolean` | `false` | Enable or disable `@nuxtjs/seo` module |
| `NUXT_PUBLIC_IGNIS_AUTH` | `boolean` | `false` | Enable or disable `nuxt-auth-utils` module |
| `NUXT_PUBLIC_IGNIS_VALIBOT` | `boolean` | `false` | Enable or disable `valibot` |
| `NUXT_PUBLIC_IGNIS_ZOD` | `boolean` | `false` | Enable or disable `zod` |
| `NUXT_PUBLIC_IGNIS_OPENPROPS` | `boolean` | `false` | Enable or disable `Open Props CSS` |
| `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` | `boolean` | `false` | Enable or disable `elrh-pslo` |

## Presets
For some common functional areas there are choices from 2+ options:

| .env variable | Values | Default | Description |
| --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_PRESET_UI` | `nuxt-ui \| tailwind \| off` | `off` | Set UI solution - `@nuxt/ui` or  `Tailwind CSS` |
| `NUXT_PUBLIC_IGNIS_PRESET_DB` | `neon \| supabase \| off` | `off` | Set DB solution - `nuxt-neon` or  `@nuxtjs/supabase` |
| `NUXT_PUBLIC_IGNIS_PRESET_FORMS` | `vueform \| formkit \| off` | `off` | Set forms solution - `@vueform/nuxt` or  `@formkit/nuxt` |
| `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION` | `valibot \| zod \| off` | `off` | Set validation solution - `valibot` or  `zod` |


## Other config
Other configurable options:

| .env variable | Values | Default | Description |
| --- | --- | --- | :--  |
| `NUXT_PUBLIC_IGNIS_I18N_LOCALE` | `string` | `en` | Set default locale for `i18n` |
| `NUXT_PUBLIC_IGNIS_I18N_CONFIG` | `string` | `/i18n.config.ts` | Set path to `i18n` config file |
| `NUXT_PUBLIC_IGNIS_FORMKIT_LOCALE` | `string` | `en` | Set default locale for `@formkit/nuxt` |
| `NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG` | `string` | `/formkit.config.ts` | Set path to `@formkit/nuxt` config file |
| `NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES` | `string` | `''` | Coma-separated list of `Vue Equipment` composables to be imported |
| `NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS` | `string` | `''` | Coma-separated list of `Vue Equipment` plugins to be imported |
| `NUXT_PUBLIC_IGNIS_PSLO_CONTENT` | `boolean` | `false` | If both `elrh-pslo` and `@nuxt/content` are enabled, this allows or disallows Markdown content pre-processing with `pslo` function |
| `NUXT_PUBLIC_IGNIS_CSS` | `string` | `''` | Coma-separated list of paths to custom CSS files to be included |
| `NUXT_PUBLIC_IGNIS_PAGES` | `boolean` | `true` | Set to `false` to disable multiple pages and routing |
| `NUXT_PUBLIC_IGNIS_SSR` | `boolean` | `true` | Set to `false` to disable server side rendering |
| `NUXT_PUBLIC_IGNIS_ERROR` | `boolean` | `true` | Set to `false` to turn default error and warn handlers off |
| `NUXT_PUBLIC_IGNIS_WARN_DUPLICATES` | `boolean` | `true` | Set to `false` to allow more than more preset solutions at once |
| `NUXT_PUBLIC_IGNIS_LOG_LEVEL` | `fatal`, `error`, `warn`, `log`, `info`, `success`, `debug`, `trace`, `silent`, `verbose` | `info` | Set level of log messages captured with `consola` |

## More info
See details about Nuxt Ignis in [Features section](/3-1-features)