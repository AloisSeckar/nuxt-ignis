# Forms features

Nuxt Ignis contains following customizable features related to content generation and displaying:

## Nuxt Content integration

- Packages: `@nuxt/content`
- Version: `3.6.1`

[Nuxt Content](https://content.nuxt.com/) is a powerful content management system for Nuxt applications that allows you to write content in Markdown, JSON, YAML, or CSV formats. It provides a flexible way to manage and display content in your application.

`Nuxt Content` integration is **disabled** by default. To enable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_CONTENT=true
```

### Nuxt Content usage notice

In order to use `@nuxt-content` via Nuxt Ignis, it is currently required to create a custom config file in the root of your project named `content.config.ts` with following contents:

```ts [content.config.ts]
// NOTE: explicit import seems to be required
import { loadContentConfig } from './utils/content'

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

This will reference [default config file](https://github.com/AloisSeckar/nuxt-ignis/blob/main/core/utils/config/content.config.ts) to enable default `@nuxt-content` collection in your project. The extra step is required as it seems not possible to transfer the config file from the layer.

Referencing config like this allows to pass in a custom config that will be [defu-merged](/2-1-configuration.html#defu-merge) with the defaults provided by Nuxt Ignis. Alternatively, you can completely ignore Nuxt Ignis' default config and create your own file based on [Nuxt Content docs](https://content.nuxt.com/docs/getting-started/installation#create-your-first-collection).

## `pslo` integration
- Packages: `elrh-pslo`
- Version: `1.1.6`

This feature exists mainly because Nuxt Ignis origins in Czechia. In Czech language it is considered a typography error to have a single-letter word at the end of a line. To avoid this [`elrh-pslo` package](https://www.npmjs.com/package/elrh-pslo) was created to provide a function to _"**P**revent **S**ingle **L**etter **O**rphans_. The effect is achieved by replacing ordinary spaces with `\xa0` Unicode character using regular expressions. 

Nuxt Ignis allows simple integration of this function for more convenience.

`elrh-pslo` integration is **disabled** by default. To enable it, you can use following environment variable:

```env
NUXT_PUBLIC_IGNIS_PSLO_ENABLED=true
```

### Additional `pslo` options

- `NUXT_PUBLIC_IGNIS_PSLO_CONTENT` - if both `elrh-pslo` and `@nuxt/content` are enabled, this allows or disallows Markdown content pre-processing with `pslo` function
