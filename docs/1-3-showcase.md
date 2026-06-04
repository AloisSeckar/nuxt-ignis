# Made with Ignis

## PragVue.com

[`https://pragvue.com/`](https://pragvue.com/)

**PragVue** is an annual Vue.js conference in Prague, Czechia. The event landing page is mostly static but stil leveraging couple of Vue and Nuxt features. Styling is made with [`Tailwind CSS`](/3-2-features-ui.html#tailwind-css) and despite not being actively used right now, the [`I18N`](/3-6-features-content.html#i18n) integration is already prepared for future multilingual support.

[![PragVue.com](/thumbs/pragvue.jpg)](https://pragvue.com/)

Configuration:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // rest of the Nuxt config

  ignis: {
    config: {
      // set HTML language attribute
      html: {
        lang: 'en',
      },
    },
    default: {
      // do not use default CSS file
      // (because of clashes with custom styling)
      css: false,
    },
    preset: {
      // use Nuxt UI integration
      ui: 'nuxt-ui',
    },
    content: {
      // use I18N integration
      i18n: {
        enabled: true,
      },
    },
  },
})
```

<details>
<summary>Dependency management</summary>

To demonstrate the biggest benefit of using Nuxt Ignis, lets compare the number of dependencies in [`package.json`](https://github.com/AloisSeckar/PragVue/blob/main/package.json) before and after Nuxt Ignis was introduced:

**Before** `(15 packages)`
- @nuxt/eslint
- @nuxt/image
- @nuxt/fonts
- @nuxt/scripts
- @nuxtjs/i18n
- @nuxtjs/tailwindcss
- @vueuse/core
- @vueuse/nuxt
- nuxt
- swiper
- tailwindcss
- typescript
- vue
- vue-router
- vue-tsc

**After** `(2 packages)`
- nuxt-ignis
- swiper

</details>

## Alois-Seckar.cz

[`https://alois-seckar.cz/`](https://alois-seckar.cz/)

Nuxt Ignis author's simple personal website with links to socials, blog and other projects. [`Tailwind CSS`](/3-2-features-ui.html#tailwind-css) and [`Nuxt UI`](/3-2-features-ui.html#nuxt-ui) are used on frontend in combination with cutom CSS. Page also has few Nuxt server-side endpoints like [`https://alois-seckar.cz/nuxt-news`](https://alois-seckar.cz/nuxt-news). Under [`https://alois-seckar.cz/run`](https://alois-seckar.cz/run) there is also a test implementation of [`nuxt-neon`](/3-3-features-db.html#neon) module along with little of [`Vueform`](/3-4-features-forms.html#vueform).

[![Alois-Seckar.cz](/thumbs/alois-seckar.jpg)](https://alois-seckar.cz/)

Configuration:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // rest of the Nuxt config

  ignis: {
    config: {
      // set HTML title and language attribute
      html: {
        title: 'Alois-Seckar.cz',
        lang: 'cs',
      },
    },
    preset: {
      // use Nuxt UI integration
      ui: 'nuxt-ui',
      // use Neon database integration
      db: 'neon',
      // use Vueform form integration
      forms: 'vueform',
    },
  },

  // NOTE
  // additional config for connection to Neon database 
  // must be provided via the .env file
  // see https://github.com/AloisSeckar/nuxt-neon
})
```

<details>
<summary>Dependency management</summary>

To demonstrate the biggest benefit of using Nuxt Ignis, lets compare the number of dependencies in [`package.json`](https://github.com/AloisSeckar/Alois-Seckar.cz/blob/main/package.json) before and after Nuxt Ignis was introduced:

**Before** `(11 packages)`
- @nuxt/eslint
- @nuxt/ui
- @vueuse/core
- @vueuse/nuxt
- crypto-js
- node-html-parser
- nuxt
- nuxt-neon
- nuxt-security
- typescript
- vue-component-type-helpers

**After** `(4 packages)`
- crypto-js
- node-html-parser
- nuxt-ignis
- vue-component-type-helpers

</details>

## master-coda.cz

[`https://master-coda.cz/`](https://master-coda.cz/)

**Master Coda** is author's personal IT blog (written in Czech language). The website uses [`Tailwind CSS`](/3-2-features-ui.html#tailwind-css) for styling and [`Nuxt Content`](/3-6-features-content.html#nuxt-content) for managing the blog posts. To deal with Czech typography rules (no single-letter words at the end of each line), the [`pslo`](/3-6-features-content.html#pslo) utility with Nuxt Content integration is used.

[![master-coda.cz](/thumbs/master-coda.jpg)](https://master-coda.cz/)

Configuration:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  // rest of the Nuxt config
  ignis: {
    config: {
      // set HTML language attribute
      html: {
        lang: 'cs',
      },
    },
    default: {
      // do not use default CSS file
      // (because of clashes with custom styling)
      css: false,
    },
    preset: {
      // use Nuxt UI integration
      ui: 'nuxt-ui',
    },
    content: {
      // use Nuxt Content integration
      content: {
        enabled: true,
      },
      // use `pslo` integration
      pslo: {
        enabled: true,
        content: true,
      },
      // use Nuxt Social Share integration
      social: {
        enabled: true,
        url: 'https://master-coda.cz/',
      },
    },
  },
})
```

<details>
<summary>Dependency management</summary>

To demonstrate the biggest benefit of using Nuxt Ignis, lets compare the number of dependencies in [`package.json`](https://github.com/AloisSeckar/master-coda/blob/master/package.json) before and after Nuxt Ignis was introduced:

**Before** `(16 packages)`
- @nuxt/content
- @nuxt/eslint
- @nuxt/icon
- @nuxt/image
- @nuxtjs/tailwindcss
- @pinia/nuxt
- @stefanobartoletti/nuxt-social-share
- better-sqlite3
- elrh-pslo
- nuxt
- nuxt-security
- pinia
- tailwindcss
- typescript
- vue
- vue-router

**After** `(1 package)`
- nuxt-ignis

</details>

## More info

- Go to [installation](/1-4-installation) to learn how to start using Nuxt Ignis.
