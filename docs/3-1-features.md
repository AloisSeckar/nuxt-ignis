# Nuxt Ignis features

This section contains the full list of NPM packages included in Nuxt Ignis. More details about each package can be found by clicking the 👁️‍🗨️ icon.

## Packages of root features

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `nuxt` | `4.2.0` | [👁️‍🗨️](/3-10-features-nuxt) | Underlying Nuxt application itself |
| `vue` | `3.5.22` | [👁️‍🗨️](/3-10-features-nuxt)  | Explicit devDependency to align with Nuxt defaults and also due to [Netlify behavior](https://github.com/nuxt/nuxt/discussions/30187) |
| `vue-router` | `4.6.3` | [👁️‍🗨️](/3-10-features-nuxt)  | Explicit devDependency to align with Nuxt defaults and also due to [Netlify behavior](https://github.com/nuxt/nuxt/discussions/30187) |
| `typescript` | `5.9.3` | [👁️‍🗨️](/3-9-features-devex.html#eslint) | Explicit dependency included to ensure correct `eslint` functionality |
| `defu` | `6.1.4` | [👁️‍🗨️](/2-1-configuration.html#defu-merge) | Used for merging user configurations with defaults |
| `date-fns` | `4.1.0` | [👁️‍🗨️](/3-9-features-devex.html#logging) | Used to get timestamps in readable format |
| `consola` | `3.4.2` | [👁️‍🗨️](/3-9-features-devex.html#logging) | Improved centralized logging solution |
| `nuxt-spec` | `0.1.14` | [👁️‍🗨️](/5-1-contributing.html#testing) | Experimental aggregated testing solution (`vitest` && `playwright` && Nuxt/Vue test utils) |
| `elrh-cosca` | `0.3.4` | [👁️‍🗨️](/3-9-features-devex.html#cli-tools) | Experimental library for code-scaffolding Node scripts |

## Packages of core features

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `@nuxt/eslint` | `1.9.0` | [👁️‍🗨️](/3-9-features-devex.html#eslint) | Official module for code linting via `eslint` |
| `@nuxt/fonts` | `0.11.4` | [👁️‍🗨️](/3-8-features-performance.html#nuxt-fonts) | Official module for working with web fonts |
| `@nuxt/image` | `1.11.0` | [👁️‍🗨️](/3-8-features-performance.html#nuxt-image) | Official module for optimizing images |
| `@nuxt/scripts` | `0.13.0` | [👁️‍🗨️](/3-8-features-performance.html#nuxt-scripts) | Official module for integrating 3rd party scripts |
| `nuxt-security` | `2.4.0` | [👁️‍🗨️](/3-9-features-devex.html#nuxt-security) | Module for establishing best security practices |
| `@vueuse/core` | `14.0.0` | [👁️‍🗨️](/3-7-features-utils.html#vueuse) | Collection of handy Vue utility functions |
| `@vueuse/nuxt` | `14.0.0` | [👁️‍🗨️](/3-7-features-utils.html#vueuse) | Nuxt connector for `VueUse` |
| `pinia` | `3.0.3` | [👁️‍🗨️](/3-8-features-performance.html#pinia) | Current ecosystem standard for state management |
| `@pinia/nuxt` | `0.11.2` | [👁️‍🗨️](/3-8-features-performance.html#pinia) | Nuxt connector for `pinia` |

## Packages of optional modules

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `@nuxt/ui` | `3.3.7` | [👁️‍🗨️](/3-2-features-ui.html#nuxt-ui) | Official UI library for Nuxt (free version) |
| `@nuxtjs/tailwindcss` | `6.14.0` | [👁️‍🗨️](/3-2-features-ui.html#tailwind-css) | Connector module for `Tailwind CSS` (**TEMP DISABLED**) |
| `@tailwindcss/vite` | `4.1.16` | [👁️‍🗨️](/3-2-features-ui.html#tailwind-css) | Vite connector for `Tailwind CSS` (**TEMP WORKAROUND**) |
| `nuxt-neon` | `0.7.0` | [👁️‍🗨️](/3-3-features-db.html#neon) | Connector module for `Neon` database |
| `@nuxtjs/supabase` | `1.6.2` | [👁️‍🗨️](/3-3-features-db.html#supabase) | Connector module for `Supabase` database |
| `@vueform/nuxt` | `1.23.0` | [👁️‍🗨️](/3-4-features-forms.html#vueform) | Connector module for `Vueform` form builder |
| `@formkit/nuxt` | `1.6.9` | [👁️‍🗨️](/3-4-features-forms.html#formkit) | Connector module for `FormKit` form builder |
| `@nuxt/content` | `3.7.1` | [👁️‍🗨️](/3-6-features-content.html#nuxt-content) | Official module for displaying `.md` content |
| `better-sqlite3` | `12.2.0` | [👁️‍🗨️](/3-6-features-content.html#nuxt-content) | Database package for Nuxt Content v3 |
| `@nuxtjs/i18n` | `10.1.1` | [👁️‍🗨️](/3-6-features-content.html#i18n) | Module for adding `i18n` internalization into apps |
| `@nuxtjs/seo` | `3.2.2` | [👁️‍🗨️](/3-7-features-utils.html#nuxt-seo) | Official module for easier SEO configuration |
| `nuxt-auth-utils` | `0.5.25` | [👁️‍🗨️](/3-7-features-utils.html#nuxt-auth-utils) | Module for easier authentication |
| `magic-regexp` | `0.10.0` | [👁️‍🗨️](/3-7-features-utils.html#magic-regexp) | Library for easier working with regular expressions |
| `nuxt-charts` | `1.0.2` | [👁️‍🗨️](/3-2-features-ui.html#nuxt-charts) | Library for easier working with charts |

## Packages of optional features

| Package | Version | Detail | Description |
| --- | :---: | :---: | :-- |
| `zod` | `4.1.12` | [👁️‍🗨️](/3-5-features-validation.html#zod) | Schema validation solution |
| `valibot` | `1.1.0` | [👁️‍🗨️](/3-5-features-validation.html#valibot) | Schema validation solution |
| `open-props` | `1.7.16` | [👁️‍🗨️](/3-2-features-ui.html#open-props) | Pre-defined CSS classes library |
| `postcss-jit-props` | `1.0.16` | [👁️‍🗨️](/3-2-features-ui.html#open-props) | PostCSS plugin to inject `open-props` |
| `@maas/vue-equipment` | `1.0.0-beta.37` | [👁️‍🗨️](/3-7-features-utils.html#vueequipment) | Collection of Vue utilities |
| `elrh-pslo` | `1.1.6` | [👁️‍🗨️](/3-6-features-content.html#pslo) | Utility for adding non-breakable spaces into text |
