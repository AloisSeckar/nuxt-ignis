# Nuxt

While Nuxt Ignis aims to provide a solid foundation for your Nuxt projects by providing default values where it makes sense, it also wants to give you maximum flexibility and freedom. This applies to the configuration of underlying Nuxt instance itself as well.

## Direct `nuxt.config.ts` edits

To make Nuxt Ignis work, you only need minimal `nuxt.config.ts` with following content:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: [
    'nuxt-ignis',
  ],
})
```

This will tell Nuxt to extend from `nuxt-ignis` layer included in the NPM package you're referencing in your `package.json`. For many use cases you will be good to go with this and with Nuxt Ignis environment variables you need.

Naturally, there will be additional scenarios. Thanks to [defu-merge](/2-1-configuration.html#defu-merge) principle you can always directly add or override any valid config option in your `nuxt.config.ts` file. 

For example, you can add your own runtime config values like this:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // extending nuxt-ignis layer
  extends: [
    'nuxt-ignis',
  ],
  // custom config - https://nuxt.com/docs/api/nuxt-config
  runtimeConfig: {
    // your custom config variables
    // they will be MERGED with Nuxt Ignis set
    // CAUTION: you should avoid using `public.ignis` prefix 
    // as it may cause conflicts
  },
})
```

## Nuxt config overrides

Aside from that, some config options can be controlled via **special Nuxt Ignis environment variables** as well. There is a reason behind that. While the direct edits to `nuxt.config.ts` are always possible, this allows us to provide out-of-the-box solutions for some scenarios.

For example, disabling SSR has an impact on [`Nuxt SEO`](/3-7-features-utils.html#nuxt-seo) module as some of its parts cannot work without SSR. If you set `ssr: false` in `nuxt.config.ts`, you would need additional config to resolve the warnings. But with `NUXT_PUBLIC_IGNIS_SSR=false` we provide, Nuxt Ignis handles this automatically, because it the value be accessed during evaluating features for the final build and process can act accordingly.

Currently, following Nuxt config options can be controlled via environment variables:

### SSR

- `NUXT_PUBLIC_IGNIS_SSR` - set to `false` to disable SSR (results in `ssr: false` in Nuxt Config)

### Pages

- `NUXT_PUBLIC_IGNIS_PAGES` - set to `false` to disable multiple pages in simple projects (results in `pages: false` in Nuxt Config)

### CSS

You can provide paths to your custom CSS files via `NUXT_PUBLIC_IGNIS_CSS` environment variable. The values must be valid CSS file paths delimited by commas (`,`). Nuxt aliases (eg. `@` or `~`) are supported. Whitespaces around will be trimmed, so it doesn't matter if you add or omit them.

For example:

```[.env]
NUXT_PUBLIC_IGNIS_CSS='@/assets/custom1.css, @/assets/custom2.css'
```

Provided values will be [defu-merged](/2-1-configuration.html#defu-merge) into `nuxt.config.ts` under `css` property:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  css: [
    '@/assets/custom1.css',
    '@/assets/custom2.css'
  ],
})
```

### HTML title

By setting:

```[.env]
NUXT_PUBLIC_IGNIS_TITLE=<YOUR APP TITLE>
```

You can set value `<YOUR APP TITLE>` to [HTML title tag](https://www.w3schools.com/tags/tag_title.asp) of your app.

Provided value will be [defu-merged](/2-1-configuration.html#defu-merge) into `nuxt.config.ts`as:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  app: {
    head: {
      title: appTitle,
    },
  },
})
```

You can still override global value provided like this with [`useHead` composable](https://nuxt.com/docs/api/composables/use-head) in your pages.
