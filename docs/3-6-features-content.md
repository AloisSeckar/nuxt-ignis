# Forms features

Nuxt Ignis contains following customizable features related to content generation and displaying:

## Nuxt Content

<PackagesReference :packages="[{ name: '@nuxt/content', version: '3.6.3' }, { name: 'better-sqlite3', version: '12.2.0' }]" />

[Nuxt Content](https://content.nuxt.com/) is a powerful content management system for Nuxt applications that allows you to write content in Markdown, JSON, YAML, or CSV formats. It provides a flexible way to manage and display content in your application.

`Nuxt Content` integration is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CONTENT=true
```

### Usage notice

In order to use `@nuxt-content` via Nuxt Ignis, it is currently required to create a custom config file in the root of your project named `content.config.ts` with following contents:

```ts [content.config.ts]
// NOTE: explicit import seems to be required
import { loadContentConfig } from './app/utils/content'

export default loadContentConfig({
  // custom config here
  //
  // custom collections (different than the default "content")
  // can be defined here via special `defineContentCollection`, e.g.:
  //
  // collections: {
  //   demo: defineContentCollection({
  //     source: '**',
  //     type: 'page',
  //   }),
  // },
})
```

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/app/utils/config/content.ts) to enable default `@nuxt-content` collection in your project. The extra step is required as it seems not possible to transfer the config file from the layer.

Referencing config like this allows to pass in a custom config that will be [defu-merged](/2-1-configuration.html#defu-merge) with the defaults provided by Nuxt Ignis. Alternatively, you can completely ignore Nuxt Ignis' default config and create your own file based on [Nuxt Content docs](https://content.nuxt.com/docs/getting-started/installation#create-your-first-collection).

## I18N

<PackagesReference :packages="[{ name: '@nuxtjs/i18n', version: '9.5.6' }]" />

[Nuxt I18N](https://i18n.nuxtjs.org/) is a module that provides internationalization support for your application. It allows you to easily manage translations and switch between different languages.

`Nuxt I18N` integration is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_I18N_ENABLED=true
```

### Additional options

- All `.json` files with messages in `@/i18n/locales` folder will be auto-scanned.
- You can select default language locale via `NUXT_PUBLIC_IGNIS_I18N_LOCALE`.
- If [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/core/main/i18n.config.ts) is not suitable for your project, you may specify path to your own using `NUXT_PUBLIC_IGNIS_I18N_CONFIG`.

### Additional utils

Nuxt Ignis provides `useT()` composable function wrapped around `useNuxtApp().$i18n.t(key)` which is the natural (and tedious) way of accessing I18N translations in `<script>` blocks. It can also be used in `<template>` instead of `$t`. As a composable, it gets auto-imported and can be used simply as:

```ts
const translation: string = useT(key: string)
```

`useT()` is designed to be operational even if `Nuxt I18N` is not enabled (although it doesn't make much sense). If so, it will try to fallback into contents of `@/i18n/locales/en.json` and look for the given key directly in this object. If the object does not contain the key or does not exist at all, it will produce a warning and return `'Translation not available'`.

## `pslo`

<PackagesReference :packages="[{ name: 'elrh-pslo', version: '1.1.6' }]" />

This feature exists mainly because Nuxt Ignis origins in Czechia. In Czech language it is considered a typography error to have a single-letter word at the end of a line. To avoid this [`elrh-pslo` package](https://www.npmjs.com/package/elrh-pslo) was created to provide a function to _"**P**revent **S**ingle **L**etter **O**rphans_. The effect is achieved by replacing ordinary spaces with `\xa0` Unicode character using regular expressions.

Nuxt Ignis allows simple integration of this function for more convenience.

`elrh-pslo` integration is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_PSLO_ENABLED=true
```

### Additional options

- `NUXT_PUBLIC_IGNIS_PSLO_CONTENT` - if both `elrh-pslo` and `@nuxt/content` are enabled, this allows or disallows Markdown content pre-processing with `pslo` function
