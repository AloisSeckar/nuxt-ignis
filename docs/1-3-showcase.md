# Made with Ignis

## PragVue.com

[`https://pragvue.com/`](https://pragvue.com/)

**PragVue** is an annual Vue.js conference in Prague, Czechia. The event landing page is mostly static but stil leveraging couple of Vue and Nuxt features. Styling is made with [`Tailwind CSS`](/3-2-features-ui.html#tailwind-css) and despite not being actively used right now, the [`I18N`](/3-6-features-content.html#i18n) integration is already prepared for future multilingual support.

[![PragVue.com](/thumbs/pragvue.jpg)](https://pragvue.com/)

Configuration:

```[.env]
# general HTML settings
NUXT_PUBLIC_IGNIS_HTML_LANG=en

# disable Ignis default CSS
NUXT_PUBLIC_IGNIS_CORE_CSS=false

# enable Tailwind CSS
NUXT_PUBLIC_IGNIS_TAILWIND=true

# enable nuxt-i18n with custom config file
NUXT_PUBLIC_IGNIS_I18N_ENABLED=true
NUXT_PUBLIC_IGNIS_I18N_CONFIG="./i18n/i18n.config.ts"
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

**After** `(3 packages)`
- nuxt-ignis
- swiper
- vue-tsc

</details>

## Alois-Seckar.cz

[`https://alois-seckar.cz/`](https://alois-seckar.cz/)

Nuxt Ignis author's simple personal website with links to socials, blog and other projects. [`Tailwind CSS`](/3-2-features-ui.html#tailwind-css) and [`Nuxt UI`](/3-2-features-ui.html#nuxt-ui) are used on frontend in combination with cutom CSS. Page also has few Nuxt server-side endpoints like [`https://alois-seckar.cz/nuxt-news`](https://alois-seckar.cz/nuxt-news). Under [`https://alois-seckar.cz/run`](https://alois-seckar.cz/run) there is also a test implementation of [`nuxt-neon`](/3-3-features-db.html#neon) module along with little of [`Vueform`](/3-4-features-forms.html#vueform).

[![Alois-Seckar.cz](/thumbs/alois-seckar.jpg)](https://alois-seckar.cz/)

Configuration:

```[.env]
# general HTML settings
NUXT_PUBLIC_IGNIS_HTML_LANG=cs
NUXT_PUBLIC_IGNIS_HTML_TITLE=Alois-Seckar.cz

# UI preset
NUXT_PUBLIC_IGNIS_PRESET_UI=nuxt-ui

# DB preset
NUXT_PUBLIC_IGNIS_PRESET_DB=neon

# Forms preset
NUXT_PUBLIC_IGNIS_PRESET_FORMS=vueform

# further connection to Neon database 
# (see https://github.com/AloisSeckar/nuxt-neon)
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

```[.env]
# general HTML settings
NUXT_PUBLIC_IGNIS_HTML_LANG=cs

# UI preset
NUXT_PUBLIC_IGNIS_PRESET_UI='tailwind'

# Nuxt Content with "pslo" integration
NUXT_PUBLIC_IGNIS_CONTENT=true
NUXT_PUBLIC_IGNIS_PSLO_ENABLED=true
NUXT_PUBLIC_IGNIS_PSLO_CONTENT=true
```

<details>
<summary>Dependency management</summary>

To demonstrate the biggest benefit of using Nuxt Ignis, lets compare the number of dependencies in [`package.json`](https://github.com/AloisSeckar/master-coda/blob/master/package.json) before and after Nuxt Ignis was introduced:

**Before** `(15 packages)`
- @nuxt/content
- @nuxt/eslint
- @nuxt/icon
- @nuxt/image
- @nuxtjs/tailwindcss
- @pinia/nuxt
- better-sqlite3
- elrh-pslo
- nuxt
- nuxt-security
- pinia
- tailwindcss
- typescript
- vue
- vue-router

**After** `(2 packages)`
- better-sqlite3
- nuxt-ignis

</details>

## More info

- Go to [installation](/1-4-installation) to learn how to start using Nuxt Ignis.
