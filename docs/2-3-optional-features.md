# Optional features

So-called _"optional features"_ are disabled by default in Nuxt Ignis. You can turn them on via environment variables.

## Presets

For common functional areas in webapps you can choose from more than one option using special _"preset"_ configuration variables.

The list of available presets currently includes:

### UI preset
It is possible to pick from three options:
- `nuxt-ui` - full https://ui.nuxt.com/ via `@nuxt/ui` connector module **[RECOMMENDED]**
- `tailwind` - only https://tailwindcss.com/ via `@nuxtjs/tailwindcss` connector module
- `off` - no UI library preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_UI` env variable.

You can still use individual settings for `nuxt-ui` and  `tailwind` modules (check [Optional modules](#optional-modules) section).

**NOTE:** Currently, this isn't actually _"one or another"_, as `nuxt-ui` is including `tailwind` (v4) automatically.

### Database preset
It is possible to pick from three options:
- `neon` - https://neon.tech/ via `nuxt-neon` connector module **[RECOMMENDED]**
- `supabase` - https://supabase.com/ via `@nuxtjs/supabase` connector module
- `off` - no database module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_DB` env variable.

You can still use individual settings for `neon` and  `supabase` modules (check [Optional modules](#optional-modules) section).

### Forms preset

It is possible to pick from three options:
- `vueform` - https://vueform.com/ via `@vueform/nuxt` connector module **[RECOMMENDED]**
- `formkit` - https://formkit.com/ via `@formkit/nuxt` connector module
- `off` - no forms module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_FORMS` env variable.

You can still use individual settings for `vueform` and  `formkit` modules (check [Optional modules](#optional-modules) section).


### Validation preset

It is possible to pick from three options:
- `valibot` - schema validation via https://valibot.dev/
- `zod` - schema validation via https://zod.dev/ 
- `off` - no validation module preset **[DEFAULT]**

Set the value via `NUXT_PUBLIC_IGNIS_PRESET_VALIDATION` env variable.

You can still use individual settings for `valibot` and  `zod` modules (check [Optional features](#optional-features) section).

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
- if [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/core/main/formkit.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_FORMKIT_CONFIG`

### Nuxt SEO usage notice
If you allow `@nuxtjs/seo` module and also set `NUXT_PUBLIC_IGNIS_SSR=false`, modules from  Nuxt SEO pack  requiring SSR (`ogImage` and `schemaOrg`) will be disabled by default. You may still override this in your project's `nuxt.config.ts`, but it will produce warning on startup.

If you set `ssr: false` directly in your project's `nuxt.config.ts`, modules mentioned above won't be disabled and you will get the warning, unless you turn them off manually.

### Vueform usage notice
In order to use `vueform` via Nuxt Ignis, is currently required to create a custom config file in the root of your project named `vueform.config.ts` with following contents:

```ts
export default loadVueformConfig({
  // custom config here
  // here you can pass extra config that will be defu-merged 
  // with the defaults provided by nuxt-ignis 
})
```

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/utils/config/vueform.config.ts) to inject `Vueform` into your project. The extra step is required as it seems not possible to transfer the config file from the layer.

Alternatively, you can ignore Nuxt Ignis' default config and create your own file based on [Vueform docs](https://vueform.com/docs/installation#manual-installation) (check instructions for Nuxt).

### Nuxt Content usage notice
In order to use `@nuxt-content` via Nuxt Ignis, is currently required to create a custom config file in the root of your project named `content.config.ts` with following contents:

```ts
// NOTE: explicit import seems to be required
import { loadContentConfig } from './utils/content'

export default loadContentConfig({
  // custom config here
  // here you can pass extra config that will be defu-merged 
  // with defaults provided by nuxt-ignis 
  //
  // custom collections (different than the default "content")
  // can be defined here via special `defineContentCollection`:
  //
  // collections: {
  //   demo: defineContentCollection({
  //     source: '**',
  //     type: 'page',
  //   }),
  // },
})
```

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/utils/config/content.config.ts) to enable default `@nuxt-content` collection in your project. The extra step is required as it seems not possible to transfer the config file from the layer.

Alternatively, you can ignore Nuxt Ignis' default config and create your own file based on [Nuxt Content docs](https://content.nuxt.com/docs/getting-started/installation#create-your-first-collection).

## Optional features
Currently, following extra features (not using separate Nuxt Modules) are optional:
- `valibot` - set `NUXT_PUBLIC_IGNIS_VALIBOT` to `true | false`
- `zod` - set `NUXT_PUBLIC_IGNIS_ZOD` to `true | false`
- `Open Props CSS` - set `NUXT_PUBLIC_IGNIS_OPENPROPS` to `true | false`
- `elrh-pslo` - set `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` to `true | false`

Default values are **false** (not included) for all optional features.

### Zod usage notice

In order to  use `zod` in Nuxt Ignis conditionally, we wrapped its import into a composable. In order to use it, you need to import it in a file like this:

```ts
const z = (await useZod())!
```

You can then use `z` object as you would normally do in your project.

**NOTE:** We are using `await` here, because the import is dynamic at runtime. And because the composable may technically return `undefined` (only if the relevant setting is not enabled), we add exclamation mark to avoid TS complaints.

### Valibot usage notice

In order to  use `valibot` in Nuxt Ignis conditionally, we wrapped its import into a composable. In order to use it, you need to import it in a file like this:

```ts
const v = (await useValibot())!
```

You can then use `v` object as you would normally do in your project.

No**NOTE:** We are using `await` here, because the import is dynamic at runtime. And because the composable may technically return `undefined` (only if the relevant setting is not enabled), we add exclamation mark to avoid TS complaints.

### elrh-pslo options
There are two config values for this feature:
- `NUXT_PUBLIC_IGNIS_PSLO_ENABLED` - setting to true will allow utility function `pslo` to treat texts in your app
- `NUXT_PUBLIC_IGNIS_PSLO_CONTENT` - if both `elrh-pslo` and `@nuxt/content` are enabled, this allows or disallows Markdown content pre-processing with `pslo` function

## Nuxt config overrides
Currently, it is possible to override following Nuxt config via .env variables:
- `NUXT_PUBLIC_IGNIS_SSR` - set to `false` to disable SSR (results in `ssr: false` in Nuxt Config)
- `NUXT_PUBLIC_IGNIS_PAGES` - set to `false` to disable multiple pages in simple projects (results in `pages: false` in Nuxt Config)

## Extra behavior
By default, Nuxt Ignis doesn't recommend mixing preset solutions. If for example both `Neon` and `Supabase` are used, a warning will be triggered on startup. For use cases when having both variants together is appropriate and desired, you can set `process.env.NUXT_PUBLIC_IGNIS_WARN_DUPLICATES=false` to surpress this warning.

## Logging
Use `NUXT_PUBLIC_INGIS_LOG_LEVEL` to set level of log messages captured with `consola`. The default value is `info`.

Possible values are: `fatal`, `error`, `warn`, `log`, `info`, `success`, `debug`, `trace`, `silent`, `verbose`

## More info
See details about Nuxt Ignis in [Features section](/3-1-features)