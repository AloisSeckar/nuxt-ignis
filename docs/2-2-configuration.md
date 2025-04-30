# Configuration
It is possible to select which Nuxt modules will be activated in your project. All dependencies are being downloaded into local `node_modules`, but Nuxt build process will ensure only relevant packages will be bundled for production.

## Core modules
Pre-defined set of Nuxt modules are being automatically included by default. However, for greater flexibility you can opt-out from using them by setting respective config value to `false`:
- use `NUXT_PUBLIC_CORE_ESLINT=false` to disable `@nuxt/eslint`
- use `NUXT_PUBLIC_CORE_FONTS=false` to disable `@nuxt/fonts`
- use `NUXT_PUBLIC_CORE_IMAGE=false` to disable `@nuxt/image`
- use `NUXT_PUBLIC_CORE_PINIA=false` to disable `@pinia/nuxt`
- use `NUXT_PUBLIC_CORE_SCRIPTS=false` to disable `@nuxt/scripts`
- use `NUXT_PUBLIC_CORE_SECURITY=false` to disable `nuxt-security`
- use `NUXT_PUBLIC_CORE_VUEUSE=false` to disable `@vueuse/nuxt`

The usage of `consola` is integrated at deeper level and cannot be opted out.

## UI preset
It is possible to pick from three options:
- `nuxt-ui` - full https://ui.nuxt.com/ via `@nuxt/ui` connector module **[RECOMMENDED]**
- `tailwind` - only https://tailwindcss.com/ via `@nuxtjs/tailwindcss` connector module
- `off` - no UI library preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_UI` env variable.

Setting the UI preset will override individual settings for `nuxt-ui` and  `tailwind` modules.

## Database preset
It is possible to pick from three options:
- `neon` - https://neon.tech/ via `nuxt-neon` connector module **[RECOMMENDED]**
- `supabase` - https://supabase.com/ via `@nuxtjs/supabase` connector module
- `off` - no database module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_DB` env variable.

Setting the database preset will override individual settings for `neon` and  `supabase` modules.

## Forms preset
It is possible to pick from three options:
- `vueform` - https://vueform.com/ via `@vueform/nuxt` connector module **[RECOMMENDED]**
- `formkit` - https://formkit.com/ via `@formkit/nuxt` connector module
- `off` - no database module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_FORMS` env variable.

Setting the forms preset will override individual settings for `vueform` and  `formkit` modules.

## Optional modules
Currently, following modules are optional:
- `@nuxt/ui` - set `NUXT_PUBLIC_IGNIS_UI` to `true | false`
- `@nuxtjs/tailwindcss` - set `NUXT_PUBLIC_IGNIS_TAILWIND` to `true | false` (ignored if `NUXT_PUBLIC_IGNIS_UI=true`)
- `nuxt-neon` - set `NUXT_PUBLIC_IGNIS_NEON` to `true | false`
- `@nuxtjs/supabase` - set `NUXT_PUBLIC_IGNIS_SUPABASE` to `true | false`
- `@nuxtjs/i18n` - set `NUXT_PUBLIC_IGNIS_I18N_ENABLED` to `true | false`
- `@formkit/nuxt` - set `NUXT_PUBLIC_IGNIS_FORMKIT_ENABLED` to `true | false`
- `@vueform/nuxt` - set `NUXT_PUBLIC_IGNIS_VUEFORM` to `true | false`
- `@nuxt/content` - set `NUXT_PUBLIC_IGNIS_CONTENT` to `true | false`
- `@nuxtjs/seo` - set `NUXT_PUBLIC_IGNIS_SEO` to `true | false` 
- `nuxt-auth-utils` - set `NUXT_PUBLIC_IGNIS_AUTH` to `true | false` 

Default values are **false** (not included) for all optional modules.

### I18N options
- you can select default language locale via `NUXT_PUBLIC_IGNIS_I18N_LOCALE`
- all `.json` files with messages in `@/i18n/locales` folder will be auto-scanned.
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/core/main/i18n.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_I18N_CONFIG`

### Formkit options
- you can select default language locale via `NUXT_PUBLIC_IGNIS_FORMKIT_LOCALE`
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob//core/main/formkit.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG`

### Nuxt SEO notice
If you allow `@nuxtjs/seo` module and also set `NUXT_PUBLIC_IGNIS_SSR=false`, modules from  Nuxt SEO pack  requiring SSR (`ogImage` and `schemaOrg`) will be disabled by default. You may still override this in your project's `nuxt.config.ts`, but it will produce warning on startup.

If you set `ssr: false` directly in your project's `nuxt.config.ts`, modules mentioned above won't be disabled and you will get the warning, unless you turn them off manually.

## Optional features
Currently, following extra features (not using separate Nuxt Modules) are optional:
- `Open Props CSS` - set `NUXT_PUBLIC_IGNIS_OPENPROPS` to `true | false`
- `elrh-pslo` - set `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` to `true | false`

Default values are **false** (not included) for all optional features.

### elrh-pslo options
There are two config values for this feature:
- `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` - setting to true will allow utility function `pslo` to treat texts in your app
- `NUXT_PUBLIC_IGNIS_PSLO_CONTENT` - if both `elrh-pslo` and `@nuxt/content` are enabled, this allows or disallows Markdown content pre-processing with `pslo` function

## Nuxt config overrides
Currently, it is possible to override following Nuxt config via .env variables:
- `NUXT_PUBLIC_IGNIS_SSR` - set to `false` to disable SSR (results in `ssr: false` in Nuxt Config)
- `NUXT_PUBLIC_IGNIS_PAGES` - set to `false` to disable multiple pages in simple projects (results in `pages: false` in Nuxt Config)

## Logging
Use `NUXT_PUBLIC_INGIS_LOG_LEVEL` to set level of log messages captured with `consola`. The default value is `info`.

Possible values are: `fatal`, `error`, `warn`, `log`, `info`, `success`, `debug`, `trace`, `silent`, `verbose`
