# Utility features

Nuxt Ignis offers following utility options:

## VueUse

<PackagesReference :packages="[{ name: '@vueuse/core', version: '14.3.0' }, { name: '@vueuse/nuxt', version: '14.3.0' }]" />

[VueUse](https://vueuse.org/) is a collection of essential Vue Composition Utilities that provides a set of reusable functions and utilities for Vue.js applications. It includes features like reactive state management, event handling, and more.

`VueUse` integration is a [default feature](/2-2-default-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_DEFAULT_VUEUSE=false
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    default: { vueuse: false },
  },
})
```

## VueEquipment

<PackagesReference :packages="[{ name: '@maas/vue-equipment', version: '1.0.0-beta.57' }]" />

[VueEquipment](https://www.vue.equipment/) is a collection of Vue composables and plugins that provides a set of reusable functions and utilities for Vue.js applications.

`VueEquipment` integration is an [optional feature](/2-3-optional-features.html) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_ENABLED=true
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    utils: { equipment: { enabled: true } },
  },
})
```

### Additional options

Simply enabling `VueEquipment` actually does **nothing** as you also need to specifify which composables and/or plugins you want to use.

There are two config values for this purpose:

- `NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_COMPOSABLES` (or `ignis.utils.equipment.composables` in `nuxt.config.ts`) - which `Vue Equipment` composables should be imported (coma-separated list)
- `NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_PLUGINS` (or `ignis.utils.equipment.plugins` in `nuxt.config.ts`) - which `Vue Equipment` plugins should be imported (coma-separated list)

The values must be a coma-separated list of available composables and plugins(see [the docs](https://www.vue.equipment/overview/getting-started.html)).

For example:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_COMPOSABLES=useCountdown
NUXT_PUBLIC_IGNIS_UTILS_EQUIPMENT_PLUGINS=MagicNoise, MagicMarquee
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    utils: {
      equipment: {
        enabled: true,
        composables: 'useCountdown',
        plugins: 'MagicNoise, MagicMarquee',
      },
    },
  },
})
```

Whitespaces around will be trimmed, so it doesn't matter if you add or omit them.

## Nuxt SEO

<PackagesReference :packages="[{ name: '@nuxtjs/seo', version: '5.1.3' }]" />

[Nuxt SEO](https://nuxtseo.com/) is a collection of Nuxt modules that handles all of the technical aspects in growing your sites organic traffic.

`Nuxt SEO` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_CONTENT_SEO_ENABLED=true
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    content: { seo: { enabled: true } },
  },
})
```

### Usage notice

If you use `@nuxtjs/seo` module and also have set `NUXT_PUBLIC_IGNIS_CONFIG_NUXT_SSR=false` (or `ignis.config.nuxt.ssr: false` in `nuxt.config.ts`), modules from `Nuxt SEO` pack requiring SSR (`ogImage` and `schemaOrg`) will be disabled by default. You may still override this in your project's `nuxt.config.ts`, but it will produce their built-in warning on startup.

**NOTE**: If you don't use Nuxt Ignis configuration and set `ssr: false` directly in your project's `nuxt.config.ts`, modules mentioned above won't be disabled and you will get the warning, unless you turn them off manually.

### Additional options

- `NUXT_PUBLIC_IGNIS_CONTENT_SEO_STATICSITE` (or `ignis.content.seo.staticsite` in `nuxt.config.ts`) - set to `true` to enable [zero-runtime sitemap generation](https://nuxtseo.com/docs/sitemap/guides/zero-runtime) and [zero-runtime OG Image generation](https://nuxtseo.com/docs/og-image/guides/zero-runtime), which is recommended for fully static sites with pre-rendered pages to optimize bundle sizes. Defaults to `false`.

### Nuxt OG Image secret

[Nuxt OG Image](https://nuxtseo.com/docs/og-image/getting-started/introduction) (bundled in `@nuxtjs/seo`) should receive the `NUXT_OG_IMAGE_SECRET` environment variable for URL tamper protection when running in SSR mode. **In DEV mode only**, Nuxt Ignis auto-generates a cryptographically secure 64-character hex secret and assigns it to `process.env.NUXT_OG_IMAGE_SECRET` under the following conditions:

- the project is running in DEV mode
- `NUXT_OG_IMAGE_SECRET` is not set yet
- `@nuxtjs/seo` module integration is enabled
- SSR is not disabled via the respective Nuxt Ignis config option
- Zero Runtime is not enabled via the respective Nuxt Ignis config option
- `nuxt-og-image` is not explicitly disabled (`ogImage: { enabled: false }` in `nuxt.config.ts`)
- `nuxt-og-image` is not running in zero-runtime mode (`ogImage: { zeroRuntime: true }` in `nuxt.config.ts`)

The generated value is also written into the project's `.env` file (with a warning comment) so it stays stable across dev server restarts and is visible to the developer. If `NUXT_OG_IMAGE_SECRET` is already declared in `.env`, the file is left untouched.

**For production**

It is **DISCOURAGED** to use the auto-generated secret from development in production as it poses a potential security risk. 

Rather than reuse the local value, generate a fresh value with `npx nuxt-og-image generate-secret` for your production environment.

## Nuxt Auth Utils

<PackagesReference :packages="[{ name: 'nuxt-auth-utils', version: '0.5.29' }]" />

[Nuxt Auth Utils](https://github.com/atinux/nuxt-auth-utils) is a set of utilities for handling authentication in Nuxt applications.

`Nuxt Auth Utils` is a [default feature](/2-2-default-features.html) and it is **enabled** by default. To disable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_DEFAULT_AUTH=false
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    default: { auth: false },
  },
})
```

## Nuxt Social Share

<PackagesReference :packages="[{ name: '@stefanobartoletti/nuxt-social-share', version: '3.0.0' }]" />

[Nuxt Social Share](https://nuxt-social-share.stefanobartoletti.it/) is a module providing seamless integration for sharing content to various social networks from your Nuxt application.

`Nuxt Social Share` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_ENABLED=true
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    content: { social: { enabled: true, url: 'https://example.com' } },
  },
})
```

### Additional options

- `NUXT_PUBLIC_IGNIS_CONTENT_SOCIAL_URL` (or `ignis.content.social.url` in `nuxt.config.ts`) - this is a **required** option that defines the URL to be shared on social networks. Set it to your application's URL or any other relevant link. It falls back to `http://nuxt-ignis.com` if not set manually and a warning is produced to the console.

## Magic Regexp

<PackagesReference :packages="[{ name: 'magic-regexp', version: '0.11.0' }]" />

[Magic Regexp](https://regexp.dev/) is a utility library for working with regular expressions in more natural way.

`Magic Regexp` integration is an [optional module](/2-3-optional-features.html#optional-modules) and it is **disabled** by default. To enable it, you can use following environment variable:

```dotenv [.env]
NUXT_PUBLIC_IGNIS_UTILS_REGEXP_ENABLED=true
```

Or equivalently in `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['nuxt-ignis'],
  ignis: {
    utils: { regexp: { enabled: true } },
  },
})
```
