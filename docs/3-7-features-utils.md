# Utility features

Nuxt Ignis offers following utility options:

## VueUse

<PackagesReference :packages="[{ name: '@vueuse/core', version: '14.0.0' }, { name: '@vueuse/nuxt', version: '14.0.0' }]" />

[VueUse](https://vueuse.org/) is a collection of essential Vue Composition Utilities that provides a set of reusable functions and utilities for Vue.js applications. It includes features like reactive state management, event handling, and more.

`VueUse` integration is a [core feature](/2-2-core-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_CORE_VUEUSE=false
```

## VueEquipment

<PackagesReference :packages="[{ name: '@maas/vue-equipment', version: '1.0.0-beta.37' }]" />

[VueEquipment](https://www.vue.equipment/) is a collection of Vue composables and plugins that provides a set of reusable functions and utilities for Vue.js applications.

`VueEquipment` integration is an [optional feature](/2-3-optional-features.html) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_EQUIPMENT_ENABLED=true
```

### Additional options

Simply enabling `VueEquipment` actually does **nothing** as you also need to specifify which composables and/or plugins you want to use.

There are two config values for this purpose:

- `NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES` - which `Vue Equipment` composables should be imported (coma-separated list)
- `NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS` - which `Vue Equipment` plugins should be imported (coma-separated list)

The values must be a coma-separated list of available composables and plugins(see [the docs](https://www.vue.equipment/overview/getting-started.html)).

For example:

```[.env]
NUXT_PUBLIC_IGNIS_EQUIPMENT_COMPOSABLES=useCountdown
NUXT_PUBLIC_IGNIS_EQUIPMENT_PLUGINS=MagicNoise, MagicMarquee
```

Whitespaces around will be trimmed, so it doesn't matter if you add or omit them.

## Nuxt SEO

<PackagesReference :packages="[{ name: '@nuxtjs/seo', version: '3.2.2' }]" />

[Nuxt SEO](https://nuxtseo.com/) is a collection of Nuxt modules that handles all of the technical aspects in growing your sites organic traffic.

`Nuxt SEO` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_SEO=true
```

### Usage notice

If you use `@nuxtjs/seo` module and also have set `NUXT_PUBLIC_IGNIS_SSR=false`, modules from `Nuxt SEO` pack requiring SSR (`ogImage` and `schemaOrg`) will be disabled by default. You may still override this in your project's `nuxt.config.ts`, but it will produce their built-in warning on startup.

**NOTE**: If you don't use Nuxt Ignis configuration and set `ssr: false` directly in your project's `nuxt.config.ts`, modules mentioned above won't be disabled and you will get the warning, unless you turn them off manually.

## Nuxt Auth Utils

<PackagesReference :packages="[{ name: 'nuxt-auth-utils', version: '0.5.25' }]" />

[Nuxt Auth Utils](https://github.com/AloisSeckar/nuxt-auth-utils) is a set of utilities for handling authentication in Nuxt applications.

`Nuxt Auth Utils` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_AUTH=true
```

## Nuxt Social Share

<PackagesReference :packages="[{ name: '@stefanobartoletti/nuxt-social-share', version: '2.2.1' }]" />

[Nuxt Social Share](https://nuxt-social-share.stefanobartoletti.it/) is a module providing seamless integration for sharing content to various social networks from your Nuxt application.

`Nuxt Social Share` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_SOCIAL_ENABLED=true
```

### Additional options

- `NUXT_PUBLIC_IGNIS_SOCIAL_URL` - this is a **required** option that defines the URL to be shared on social networks. Set it to your application's URL or any other relevant link. It falls back to `http://nuxt-ignis.com` if not set manually and a warning is produced to the console.

## Magic Regexp

<PackagesReference :packages="[{ name: 'magic-regexp', version: '0.10.0' }]" />

[Magic Regexp](https://regexp.dev/) is a utility library for working with regular expressions in more natural way.

`Magic Regexp` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv
NUXT_PUBLIC_IGNIS_REGEXP=true
```
